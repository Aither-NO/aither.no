"use client";
import { ADAPTIVE_PAGE_SPACING } from "@/constants/layout";
import { useGSAP } from "@gsap/react";
import {
  ArrowDownIcon,
  CodeIcon,
  GearIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Container,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import gsap from "gsap";
import React, { useRef } from "react";

export function FeatureSection() {
  return (
    <section>
      <Container p={ADAPTIVE_PAGE_SPACING}>
        <Flex direction="column" gap="9" py="9">
          <Heading size="9" mb="9">
            We&apos;ve got something for everyone
          </Heading>
          <Feature
            title="Show off your property with stunning visuals"
            description="Aither's image processing technology is revolutionising the way we visualise solar energy and property landscapes. Our cutting-edge algorithms and deep learning models provide unparalleled accuracy and detail."
            color="green"
            icon={<HomeIcon />}
            animation="bounce"
            linkText="Read more"
            href="/"
            id="home"
            next="api"
          />
          <Separator my="7" size="4" />
          <Feature
            title="Integrate with our API for seamless image processing"
            description="Our API is designed to be simple to use and integrate with your existing applications. With just a few lines of code, you can access our powerful image processing algorithms and visualisation tools."
            color="indigo"
            icon={<GearIcon />}
            linkText="Read more"
            animation="rotate"
            href="/pricing"
            id="api"
            next="widgets"
          />
          <Separator my="7" size="4" />
          <Feature
            title="Use our prebuilt widgets to enhance your website in minutes"
            description="Our premade widgets are designed to be easy to use and customise. With just a few lines of code, you can add stunning visualisations and image processing tools to your website"
            color="bronze"
            icon={<CodeIcon />}
            linkText="Get updates"
            animation="fade"
            href="/"
            id="widgets"
            next="subscribe"
          />
        </Flex>
      </Container>
    </section>
  );
}

type ButtonColor = Parameters<typeof Button>[0]["color"];

function Feature(props: {
  title: string;
  description: string;
  color: ButtonColor;
  icon: React.ReactElement;
  linkText: string;
  href: string;
  animation?: "rotate" | "bounce" | "fade";
  id: string;
  next: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const icon = useRef<SVGSVGElement>(null);
  const iconWithProps = React.cloneElement(props.icon, {
    style: {
      width: "50%",
      height: "auto",
    },
    color: `var(--${props.color}-8)`,
    opacity: 0.3,
    ref: icon,
  });

  useGSAP(() => {
    if (props.animation) {
      const iconTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      const boxTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play reset play reset",
          },
        })
        .from(container.current, {
          opacity: 0.3,
          scale: 0.95,
          duration: 1,
          translateY: 60,
          ease: "power3",
        });

      switch (props.animation) {
        case "rotate":
          iconTl
            .to(icon.current, {
              rotate: 360,
              duration: 5,
              ease: "none",
            })
            .to(icon.current, {
              rotate: 0,
              duration: 5,
              ease: "none",
            });
          break;
        case "bounce":
          iconTl.to(icon.current, {
            y: 60,
            duration: 1,
            ease: "bounce",
          });
          break;
        case "fade":
          iconTl
            .to(icon.current, {
              opacity: 0.2,
              duration: 1,
            })
            .to(icon.current, {
              opacity: 1,
              duration: 1,
            });
          break;
      }
    }
  }, [props.animation]);
  return (
    <Flex direction="row" gap="7" id={props.id}>
      <Flex
        direction="column"
        gap="7"
        maxWidth={{ initial: "auto", md: "60ch" }}
        ref={container}
      >
        <Heading size="8" wrap="pretty">
          {props.title}
        </Heading>
        <Text size="6" color="gray" wrap="pretty">
          {props.description}
        </Text>
        <Button
          variant="soft"
          size="4"
          color={props.color}
          onClick={() => {
            const nextEl = document.querySelector(
              `#${props.next}`
            );
            if (nextEl) {
              nextEl.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }}
        >
          <Flex align="center" gap="2">
            {props.linkText}
            <ArrowDownIcon />
          </Flex>
        </Button>
      </Flex>
      <Flex
        align="center"
        justify="center"
        width="100%"
        display={{
          initial: "none",
          md: "flex",
        }}
      >
        {iconWithProps}
      </Flex>
    </Flex>
  );
}
