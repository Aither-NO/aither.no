"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMount } from "@/hooks/useMount";
import {
  ExternalLinkIcon,
  GlobeIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DarkmodeToggle } from "../DarkmodeToggle/DarkmodeToggle";

const COLLAPSE_WIDTH = 980;

export function NavigationBar(props: {
  user?: { name: string; email: string };
}) {
  const isCollapsed = useMediaQuery(
    `(max-width: ${COLLAPSE_WIDTH}px)`
  );
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Flex
      style={{
        background: "var(--ui-1)",
        borderBottom: "1px solid var(--ui-4)",
      }}
      justify="between"
      direction="row"
      gap="9"
      p="5"
      align="center"
    >
      <Link href="/" style={{ flexShrink: 0 }}>
        <LogoImage />
      </Link>
      <Flex gap="6" align="center">
        <Button
          size="4"
          color="gray"
          variant="ghost"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            const el =
              document.querySelector<HTMLInputElement>(
                "#subscribe"
              );
            if (el) {
              el.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              el.focus();
            } else {
              window.location.href = "/#subscribe";
            }
          }}
        >
          Sign up
        </Button>
        <DarkmodeToggle />
      </Flex>
    </Flex>
  );
}

function LogoImage() {
  const { forcedTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const derivedTheme = forcedTheme ?? theme ?? systemTheme;

  useMount(() => setMounted(true));

  if (!mounted)
    return <div style={{ width: "150px", height: "47px" }} />;
  const src =
    derivedTheme === "dark"
      ? "/img/logo-light.png"
      : "/img/logo-dark.png";

  return (
    <Image
      width={150}
      height={41.25}
      src={src}
      alt="Aither logo"
      id="mainlogo"
    />
  );
}

function IconText(props: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Flex
      align="center"
      gap="1"
      style={{ display: "inline-flex" }}
    >
      <span>{props.icon}</span>
      <span>{props.children}</span>
    </Flex>
  );
}

function ProductPopover() {
  return (
    <Box>
      <Flex direction="column" gap="3" p="2">
        <Heading size="7">Sun Report</Heading>
        <Text color="gray">
          Upload an image and get a detailed report of the sun
          exposure in the image based on{" "}
          <IconText
            icon={<TimerIcon width="0.75em" height="0.75em" />}
          >
            time
          </IconText>{" "}
          and{" "}
          <IconText
            icon={<GlobeIcon width="0.75em" height="0.75em" />}
          >
            space
          </IconText>
          .
        </Text>
        <Flex gap="3" style={{ width: "100%" }}>
          <Button asChild variant="soft" color="teal" size="3">
            <a href="/sunvi/create">Purchase access</a>
          </Button>
          <Button
            asChild
            variant="solid"
            color="teal"
            size="3"
            style={{ flexGrow: 1 }}
          >
            <a href="/sunvi/create">Try demo</a>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

function DevelopersPopover() {
  return (
    <Box>
      <Flex direction="column" gap="3" p="2">
        <Heading size="7">Documentation</Heading>
        <Text color="gray">
          Integrate our APIs and SDKs to build your own
          applications and services.
        </Text>
        <Flex gap="3" style={{ width: "100%" }}>
          <Button
            asChild
            variant="solid"
            color="indigo"
            size="3"
            style={{ flexGrow: 1 }}
          >
            <a href="http://localhost:3001/guide">Get started</a>
          </Button>
          <Button
            asChild
            variant="outline"
            color="indigo"
            size="3"
          >
            <a href="http://localhost:3001/integrations">
              Integrations <ExternalLinkIcon />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            color="indigo"
            size="3"
          >
            <a href="http://localhost:3001/api">
              API <ExternalLinkIcon />
            </a>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

function SupportPopover() {
  return (
    <Box>
      <Flex direction="column" gap="3" p="2">
        <Heading size="7">Support</Heading>
        <Text color="gray">
          Get help with your account, billing, or any other
          questions you may have.
        </Text>
        <Flex gap="3" style={{ width: "100%" }}>
          <Button
            asChild
            variant="solid"
            color="gray"
            size="3"
            style={{ flexGrow: 1 }}
          >
            <a href="/contact">Contact us</a>
          </Button>
          <Button
            asChild
            variant="outline"
            color="gray"
            size="3"
          >
            <a href="/sunvi/create">
              Help center <ExternalLinkIcon />
            </a>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
