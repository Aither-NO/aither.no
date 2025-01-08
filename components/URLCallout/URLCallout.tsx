"use client";

import { useMount } from "@/hooks/useMount";
import { useGSAP } from "@gsap/react";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Button, Callout, Flex } from "@radix-ui/themes";
import gsap from "gsap";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useRef } from "react";

export function URLCallout({
  dismissable = true,
}: {
  /** Default: `true` */
  dismissable?: boolean;
}) {
  const [mounted, setMounted] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const error = params.get("error");
  const successMsg = params.get("successMsg");
  useMount(() => {
    setMounted(true);
  });

  useGSAP(() => {
    if (mounted) {
      gsap.from(ref.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.25,
      });
    }
  }, [mounted, error, successMsg]);
  if (!mounted || (!error && !successMsg)) return null;
  const text = error || successMsg;
  return (
    <Callout.Root
      ref={ref}
      color={error ? "red" : "green"}
      suppressHydrationWarning
    >
      <Callout.Icon>
        {error ? (
          <ExclamationTriangleIcon />
        ) : (
          <InfoCircledIcon />
        )}
      </Callout.Icon>
      <Callout.Text>
        <Flex align="center" gap="3" justify="between">
          {text}
          {dismissable && (
            <Button
              size="1"
              variant="soft"
              autoFocus
              onClick={() => {
                router.push(pathname.split("?")[0]);
              }}
            >
              Dismiss
            </Button>
          )}
        </Flex>
      </Callout.Text>
    </Callout.Root>
  );
}
