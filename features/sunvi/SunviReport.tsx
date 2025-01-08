"use client";
import { SunChart } from "@/components/charts/SunChart/SunChart";
import { useElementSize } from "@/hooks/useElementSize";
import { useIsClient } from "@/hooks/useIsClient";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { angleToDirection } from "@/utils/client/3d";
import { capitalizeFirstLetter } from "@/utils/client/text";
import {
  ArrowUpIcon,
  CalendarIcon,
  ExternalLinkIcon,
  MagicWandIcon,
  SewingPinFilledIcon,
  SunIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Code,
  DataList,
  Flex,
  Heading,
  ScrollArea,
  Spinner,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { AiSuggestionList } from "./AiSuggestionList";
import { useSunVisForm } from "./context";
import { SunVisualizerWithControls } from "./SunVisualizerWithControls";

export function SunviReport(props: { id: string }) {
  const isClient = useIsClient();
  const isSmallScreen = useMediaQuery("(max-width: 1025px)");
  const [viewExpanded, setViewExpanded] = useState(false);
  const [ref, size] = useElementSize<HTMLDivElement>();
  const isHorizontalView = !isSmallScreen && !viewExpanded;

  if (!isClient) return <Spinner />;

  return (
    <Flex direction={"column"} gap="5">
      <Heading size="5">
        Sun Report: <Text color="sky">{props.id}</Text>
      </Heading>
      <Flex
        direction={{
          initial: "column",
          md: viewExpanded ? "column" : "row",
        }}
        gap="5"
      >
        <SunVisualizerWithControls
          viewExpanded={viewExpanded}
          setViewExpanded={setViewExpanded}
          containerRef={ref}
        />
        <ScrollArea
          style={
            isHorizontalView
              ? {
                  flexGrow: 1,
                  flexBasis: "0px",
                  height: size.height - 32,
                }
              : undefined
          }
        >
          <AttributesList />
        </ScrollArea>
      </Flex>
    </Flex>
  );
}

function AttributesList() {
  const { watch } = useSunVisForm();
  const angle = watch("angle");
  const location = watch("location");
  const month = watch("month");
  const time = watch("time");
  const hours = Math.floor(time);
  const rest = time - hours;
  const minutes = Math.floor(rest * 60);
  const face = angleToDirection(angle ?? 0)
    .split("-")
    .map((v) => v[0])
    .join("");
  return (
    <>
      <DataList.Root size="3" orientation="vertical">
        <DataList.Item>
          <DataList.Label>Rating</DataList.Label>
          <DataList.Value>
            <Badge color="green">A2</Badge>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Flex align="center" gap="2">
              Daily sun exposure
              <SunIcon />
            </Flex>
          </DataList.Label>
          <DataList.Value>
            <div style={{ height: 70, width: "100%" }}>
              <SunChart />
            </div>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label>Place</DataList.Label>
          <DataList.Value style={{ width: "100%" }}>
            <Flex align="center" gap="2">
              <Tooltip content={`${angle}°`}>
                <Flex align="center" gap="2">
                  <ArrowUpIcon
                    style={{
                      transformOrigin: "center center",
                      rotate: `${angle}deg`,
                    }}
                  />
                  {face}
                </Flex>
              </Tooltip>
              <SewingPinFilledIcon />
              <Code color="gray">
                {location?.lat}, {location?.lon}
              </Code>
              <Button
                asChild
                variant="soft"
                color="gray"
                size="1"
              >
                <Link
                  href={`https://www.google.com/maps/place/${location?.lat},${location?.lon}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <ExternalLinkIcon />
                </Link>
              </Button>
            </Flex>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Time</DataList.Label>
          <DataList.Value>
            <Flex align="center" gap="2">
              <CalendarIcon />
              {capitalizeFirstLetter(month ?? "june")}{" "}
              <TimerIcon />
              <Code color="gray">
                {hours.toString().padStart(2, "0")}:
                {minutes.toString().padStart(2, "0")}
              </Code>
            </Flex>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Flex align="center" gap="2">
              AI Summary <MagicWandIcon />
            </Flex>
          </DataList.Label>
          <DataList.Value>
            <Text>
              This property has great overall sun exposure -
              except for the months of April and May. Look into
              planting trees that provide shade to reduce sun
              exposure over the months of July and August.
            </Text>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Flex align="center" gap="2">
              AI Suggestions <MagicWandIcon />
            </Flex>
          </DataList.Label>
          <DataList.Value>
            <AiSuggestionList />
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </>
  );
}
