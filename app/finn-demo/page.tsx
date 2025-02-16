"use client";
import { SunviFormProvider } from "@/features/sunvi/context";
import { SunviReport } from "@/features/sunvi/SunviReport";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Box, Button, Dialog, Text } from "@radix-ui/themes";
import { useState } from "react";
import config from "../../next.config.mjs";

export default function FinnDemo() {
  const isSmall = useMediaQuery("(max-width: 650px)");
  const [sunviOpen, setSunviOpen] = useState(false);

  return (
    <Box p="5" style={{ background: "var(--amber-1)" }}>
      <Box
        p="2"
        mb="3"
        style={{
          background: `repeating-linear-gradient(
  -55deg,
  var(--amber-1),
  var(--amber-1) 10px,
  var(--amber-2) 10px,
  var(--amber-2) 20px
)`,
          textAlign: "center",
        }}
      >
        <Text weight="bold" size="1">
          This is a demo page intended for internal use only
        </Text>
      </Box>
      <Box
        style={{
          margin: "0 auto",
          position: "relative",
          maxWidth: 1200,
        }}
      >
        <img
          src={
            config.basePath +
            "/img/finndemo-" +
            (isSmall ? "sm" : "lg") +
            ".jpg"
          }
          alt="Demo bg"
          style={{ margin: "0 auto" }}
        />

        <Dialog.Root>
          <Dialog.Trigger>
            {isSmall ? (
              <Button
                size="2"
                style={{
                  position: "absolute",
                  bottom: "40%",
                  left: "4%",
                  minWidth: "22%",
                  height: "5.5%",
                  fontSize: "2vw",
                  paddingInline: "2vw",
                }}
                color="indigo"
              >
                Se solforhold
              </Button>
            ) : (
              <Button
                size="1"
                style={{
                  position: "absolute",
                  bottom: "29%",
                  left: "4%",
                  minWidth: "13%",
                  height: "4.4%",
                  fontSize: "1.5vw",
                  paddingInline: "2vw",
                }}
                color="indigo"
              >
                Se solforhold
              </Button>
            )}
          </Dialog.Trigger>
          <Dialog.Content>
            <div style={{ minHeight: 500 }}>
              <SunviFormProvider>
                <SunviReport
                  id="Solsvingen 1"
                  defaultExpanded
                  hideTopControls
                />
              </SunviFormProvider>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </Box>
    </Box>
  );
}
