"use client";

import React from "react";

/**
 * Takes a single child and applies onClick handler:
 * ```tsx
 * <BackToTop>
 *  <Button>Back to top</Button>
 * </BackToTop>
 * ```
 */
export function BackToTop(props: {
  children: React.ReactElement;
}) {
  const childWithHandler = React.cloneElement(props.children, {
    onClick: () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });
  return childWithHandler;
}
