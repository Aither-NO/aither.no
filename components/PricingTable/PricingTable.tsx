"use client";

import { useBreakpoint } from "@/hooks/useMediaQuery";
import {
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Card,
  Flex,
  Table,
  Text,
} from "@radix-ui/themes";
import { ReactNode } from "react";

type ButtonColor = Parameters<typeof Button>[0]["color"];

export function PricingTable(props: {
  title: string;
  items: {
    content: ReactNode;
    disabled?: boolean;
    highlighted?: boolean;
  }[];
  size?: "1" | "2";
  buttonTitle: string;
  color?: ButtonColor;
  description?: ReactNode;
}) {
  const breakpoint = useBreakpoint();
  return (
    <>
      <Card
        size="1"
        variant="surface"
        style={
          props.size === "2" && breakpoint.isLg
            ? {
                transform: "scale(1.05)",
              }
            : breakpoint.isSm
            ? {
                borderBottom: "3px solid var(--ui-2)",
              }
            : { maxWidth: "100%" }
        }
        mb={{
          initial: "3",
          lg: "0",
        }}
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>
                {props.title}
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {props.items.map((item) => {
              return (
                <Table.Row key={String(item.content)}>
                  <Table.Cell>
                    <Text
                      color={item.disabled ? "gray" : "bronze"}
                      weight={
                        item.highlighted ? "bold" : undefined
                      }
                    >
                      <Flex align="center" gap="2">
                        {item.disabled ? (
                          <CrossCircledIcon />
                        ) : (
                          <CheckCircledIcon />
                        )}
                        {item.content}
                      </Flex>
                    </Text>
                  </Table.Cell>
                </Table.Row>
              );
            })}
            <Table.Row>
              <Table.Cell style={{ boxShadow: "none" }} pt="5">
                <Flex direction="column" gap="3" align="start">
                  <Button
                    variant="soft"
                    size="3"
                    color={props.color ?? "gray"}
                    style={{ width: "100%" }}
                  >
                    {props.buttonTitle}
                  </Button>
                  {props.description && (
                    <Text size="1" color="gray">
                      {props.description}
                    </Text>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Card>
    </>
  );
}
