import { Flex, Link, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";

export function Breadcrumbs(props: {
  path: Array<
    | string
    | {
        label: string;
        href: string;
      }
  >;
}) {
  return (
    <Flex align="center" gap="2">
      {props.path.map((item, index) => (
        <React.Fragment key={index}>
          <PathItem item={item} />
          {index < props.path.length - 1 && (
            <Text color="gray">/</Text>
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
}

function PathItem(props: {
  item:
    | string
    | {
        label: string;
        href: string;
      };
}) {
  return (
    <div>
      {typeof props.item === "string" ? (
        <Text color="gray">{props.item}</Text>
      ) : (
        <Link href={"#"} asChild>
          <NextLink href={props.item.href}>
            {props.item.label}
          </NextLink>
        </Link>
      )}
    </div>
  );
}
