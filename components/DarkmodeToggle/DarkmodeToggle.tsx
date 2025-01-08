"use client";

import { useMount } from "@/hooks/useMount";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button, Switch } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import { useState } from "react";

export function DarkmodeToggle({
  variant = "icon",
  size,
}: {
  variant?: "icon" | "switch";
  size?: "1" | "2" | "3";
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useMount(() => setMounted(true));

  let defaultState = <></>;
  if (variant === "switch") {
    defaultState = <Switch disabled />;
  }
  if (variant === "icon") {
    defaultState = (
      <Button
        variant="ghost"
        color="gray"
        disabled
        size={size ?? "4"}
      >
        <SunIcon />
      </Button>
    );
  }

  if (!mounted) return defaultState;

  switch (variant) {
    case "icon":
      return (
        <Button
          variant="ghost"
          color="gray"
          size="4"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </Button>
      );
    case "switch":
      return (
        <Switch
          checked={isDark}
          onCheckedChange={() =>
            setTheme(isDark ? "light" : "dark")
          }
          size={size}
        />
      );
  }
}
