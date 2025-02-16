"use client";
import { SunChart } from "@/components/charts/SunChart/SunChart";
import { useElementSize } from "@/hooks/useElementSize";
import { useIsClient } from "@/hooks/useIsClient";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { angleToDirection } from "@/utils/client/3d";
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

export function SunviReport(props: {
  id: string;
  defaultExpanded?: boolean;
  hideTopControls?: boolean;
}) {
  const isClient = useIsClient();
  const isSmallScreen = useMediaQuery("(max-width: 1025px)");
  const [viewExpanded, setViewExpanded] = useState(
    props.defaultExpanded ?? false
  );
  const [ref, size] = useElementSize<HTMLDivElement>();
  const isHorizontalView = !isSmallScreen && !viewExpanded;

  if (!isClient) return <Spinner />;

  return (
    <Flex direction={"column"} gap="5">
      <Heading size="5">
        Solrapport for <Text color="sky">{props.id}</Text>
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
          hideTopControls={props.hideTopControls}
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
        {/* <DataList.Item>
          <DataList.Label>Rating</DataList.Label>
          <DataList.Value>
            <Badge color="green">A2</Badge>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Flex align="center" gap="2">
              Daglig sollys
              <SunIcon />
            </Flex>
          </DataList.Label>
          <DataList.Value>
            <div style={{ height: 70, width: "100%" }}>
              <SunChart />
            </div>
          </DataList.Value>
        </DataList.Item> */}

        {location ? (
          <DataList.Item>
            <DataList.Label>Plass</DataList.Label>
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
        ) : null}
        <DataList.Item>
          <DataList.Label>Tid</DataList.Label>
          <DataList.Value>
            <Flex align="center" gap="2">
              <CalendarIcon />
              {/* {capitalizeFirstLetter(month ?? "juni")}{" "} */}
              22 Juni <TimerIcon />
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
              Daglig sollys
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
          <DataList.Label>
            <Flex align="center" gap="2">
              AI oppsummering <MagicWandIcon />
            </Flex>
          </DataList.Label>
          <DataList.Value>
            Gjennomsnittlig antall soltimer per dag er 11 timer
            og 27 minutter, med den tidligste soloppgangen
            klokken 05:17 og den seneste solnedgangen klokken
            22:20. Terrenget blokkerer i gjennomsnitt 27 minutter
            med kveldssol hver dag, og skydekke utgjør 67 % av
            året. Med solcellepanel kan man potensielt generere
            6900 kWh årlig.
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Flex align="center" gap="2">
              Informasjon <MagicWandIcon />
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
