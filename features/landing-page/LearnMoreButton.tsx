"use client";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

export function LearnMoreButton() {
  return (
    <Button
      onClick={() => {
        const scrollSection = document.querySelector("#vss");
        if (scrollSection) {
          scrollSection.scrollIntoView({
            behavior: "smooth",
          });
        }
      }}
      variant="solid"
      size="4"
      color="indigo"
    >
      <ArrowDownIcon />
      Learn more
    </Button>
  );
}
