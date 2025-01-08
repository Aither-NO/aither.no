"use client";

import { Button, Popover } from "@radix-ui/themes";

export function PopoverLink(props: {
  href: string;
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="outline" size="2">
          {props.children}
        </Button>
      </Popover.Trigger>
      <Popover.Content style={{ background: "var(--ui-2)" }}>
        {props.content}
      </Popover.Content>
    </Popover.Root>
  );
}
