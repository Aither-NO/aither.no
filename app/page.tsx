import { BackToTop } from "@/components/BackToTop/BackToTop";
import { BlurredBackground } from "@/components/BlurredBackground/BlurredBackground";
import { ADAPTIVE_PAGE_SPACING } from "@/constants/layout";
import { FeatureSection } from "@/features/landing-page/FeatureSection";
import { LearnMoreButton } from "@/features/landing-page/LearnMoreButton";
import { PartnersCard } from "@/features/landing-page/PartnersCard";
import { ScrollVideoSection } from "@/features/landing-page/ScrollVideoSection";
import {
  ArrowUpIcon,
  BellIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import config from "../next.config.mjs";

export default function Home() {
  return (
    <Flex direction="column">
      <BlurredBackground
        src={config.basePath + "/img/house-garden-2.png"}
        fullHeight
        blur={10}
        shade="var(--bg-transparent)"
        bgPosition="bottom 10% left 0"
      >
        <Grid
          columns={{ initial: "1", lg: "2" }}
          gap="7"
          p={ADAPTIVE_PAGE_SPACING}
          style={{}}
          align="center"
        >
          <Card size="3" variant="ghost">
            <Flex
              direction="column"
              gap="5"
              style={{ maxWidth: "950px" }}
              mt={{ initial: "5", lg: "0" }}
              mb={{ initial: "5", lg: "0" }}
            >
              <Heading size="9" style={{}}>
                A Revolution in Image Technology & Solar Energy
                Visualisation
              </Heading>
              <Text size="6" color="gray" style={{}}>
                Welcome to Aither, where we&apos;re redefining
                the boundaries of image processing and solar
                energy visualisation.
              </Text>
              <Flex align="center" gap="3">
                <LearnMoreButton />
                <Button asChild size="4" color="gray">
                  <Link href="/demo">Open demo</Link>
                </Button>
              </Flex>
            </Flex>
          </Card>
        </Grid>
      </BlurredBackground>
      <ScrollVideoSection />
      <FeatureSection />
      <section
        style={{
          background: `linear-gradient(134deg, var(--ui-1) 25%, var(--ui-2) 25%, var(--ui-2) 50%, var(--ui-1) 50%, var(--ui-1) 75%, var(--ui-2) 75%, var(--ui-2) 100%);`,
          backgroundSize: "417.05px 431.87px",
        }}
      >
        <Container p={ADAPTIVE_PAGE_SPACING}>
          <Flex direction="column" gap="6">
            <Card
              size="4"
              style={{ maxWidth: 900, margin: "0 auto" }}
            >
              <Flex gap="5">
                <BellIcon
                  style={{
                    width: 120,
                    height: 120,
                    alignSelf: "center",
                    rotate: "-10deg",
                  }}
                  color="gray"
                />
                <Flex direction="column" gap="5">
                  <Flex direction="column" gap="2">
                    <Heading size="8">
                      We&apos;re still brewing
                    </Heading>
                    <Heading size="6" color="gray">
                      Subscribe to our mailing list for updates
                    </Heading>
                  </Flex>
                  <FormItem label="Your email">
                  <form action="https://formspree.io/f/mannayqn" method="POST">
                    <TextField.Root
                      type="email" 
                      name="email"
                      id="subscribe"
                      color="green"
                      size="3"
                    >
                      <TextField.Slot />
                      <TextField.Slot>
                        <Button
                          type="submit"
                          size="3"
                          color="green"
                          variant="ghost"
                          style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                        >
                          <EnvelopeClosedIcon />
                          Subscribe
                        </Button>
                      </TextField.Slot>
                    </TextField.Root>
                    <input type="hidden" name="message" value="I want to subscribe to the mailing list for updates!"/>
                    </form>
                  </FormItem>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Container>
      </section>
      <footer
        style={{
          background: "var(--ui-2)",
        }}
      >
        <Container p={ADAPTIVE_PAGE_SPACING}>
          <Flex direction="column" gap="5" align="center">
            <Heading
              size="9"
              mt={{ initial: "3", md: "5", lg: "7" }}
              style={{ textAlign: "center" }}
            >
              With support from our partners
            </Heading>
            <Text
              size="6"
              style={{
                textAlign: "center",
              }}
              color="gray"
            >
              We are proud to collaborate with our partners
            </Text>
            <PartnersCard />
            <div style={{ minHeight: "var(--space-9)" }} />
            <BackToTop>
              <Button variant="ghost" size="4" color="gray">
                <Flex gap="2" align="center">
                  <ArrowUpIcon />
                  Back to top
                </Flex>
              </Button>
            </BackToTop>
          </Flex>
        </Container>
      </footer>
    </Flex>
  );
}

function FormItem(props: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" gap="1">
      <Text size="3" color="gray">
        {props.label}
      </Text>
      {props.children}
    </Flex>
  );
}
