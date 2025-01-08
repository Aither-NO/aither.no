import { Box } from "@radix-ui/themes";
import React from "react";

export function BlurredBackground(props: {
  children: React.ReactElement;
  src: string;
  blur?: number;
  fullHeight?: boolean;
  shade?: string;
  bgPosition?: string;
}) {
  const children = React.Children.only(props.children);
  const childrenWithProps = React.cloneElement(children, {
    style: {
      background: props.shade ?? "var(--gray-a3)",
      backdropFilter: `blur(${props.blur ?? 15}px)`,
      minHeight: props.fullHeight
        ? "calc(100vh - 6.05rem)"
        : undefined,
      ...children.props.style,
    },
  });
  return (
    <Box
      style={{
        background: `url(${props.src})`,
        backgroundSize: "cover",
        backgroundPosition: props.bgPosition ?? "center",
      }}
    >
      {childrenWithProps}
    </Box>
  );
}
