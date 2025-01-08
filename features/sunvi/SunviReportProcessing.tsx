"use client";
import { wait } from "@/utils";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Card,
  Code,
  DataList,
  Flex,
  Heading,
  Progress,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import styles from "./SunviReportProcessing.module.css";
import { useSunVisForm } from "./context";

export function SunviReportProcessing(props: { id: string }) {
  const params = useParams();
  const router = useRouter();
  const { watch } = useSunVisForm();
  const [fileStatus, setFileStatus] = useState("Uploading");
  const [fileProgress, setFileProgress] = useState(0);
  const fileSrc = watch("file");
  const location = watch("location");

  useEffect(() => {
    // simple loading mock for the sake of the demo
    (async function () {
      setFileProgress(35);
      await wait(200);
      setFileProgress(44);
      await wait(200);
      setFileProgress(65);
      await wait(100);
      setFileProgress(95);
      setFileProgress(100);
      await wait(600);
      setFileProgress(0);
      setFileStatus("Processing");
      await wait(800);
      setFileProgress(65);
      await wait(300);
      setFileProgress(100);
      router.push(`/sunvi/item/${params.id}`);
    })();
  }, []);
  return (
    <Flex direction="column" gap="5">
      <Heading size="5">Report is processing</Heading>
      <Text size="3" color="gray">
        Your image is being uploaded and processed. This may take
        a few moments.
      </Text>
      <Flex direction="row" gap="5">
        <div>
          <DataList.Root size="3" style={{ width: "100%" }}>
            <DataList.Item align="center">
              <DataList.Label>Progress</DataList.Label>
              <DataList.Value>
                <Flex
                  align="center"
                  gap="2"
                  style={{ width: "100%" }}
                >
                  <Progress color="teal" value={fileProgress} />
                </Flex>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Status</DataList.Label>
              <DataList.Value>
                {fileStatus === "Uploading" ? (
                  <Badge color="teal" variant="soft">
                    Uploading
                  </Badge>
                ) : (
                  <Badge color="green" variant="soft">
                    Processing
                  </Badge>
                )}
              </DataList.Value>
            </DataList.Item>
            {location && (
              <DataList.Item>
                <DataList.Label>Location</DataList.Label>
                <DataList.Value style={{ width: "100%" }}>
                  <Flex align="center" gap="2">
                    <Code>
                      {location.lat}, {location.lon}
                    </Code>
                    <Button
                      asChild
                      variant="soft"
                      color="gray"
                      size="1"
                    >
                      <Link
                        href={`https://www.google.com/maps/place/${location.lat},${location.lon}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <ExternalLinkIcon />
                      </Link>
                    </Button>
                  </Flex>
                </DataList.Value>
              </DataList.Item>
            )}
            <DataList.Item>
              <DataList.Label>Preview</DataList.Label>
              <DataList.Value>
                <div className={styles.preview}>
                  {fileSrc && (
                    <ImageWithFallback
                      src={fileSrc}
                      style={{ userSelect: "none" }}
                      alt="Preview"
                      fallback={
                        <Card size="1">
                          <Text>Could not load preview</Text>
                        </Card>
                      }
                    />
                  )}
                </div>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </div>
      </Flex>
    </Flex>
  );
}

function ImageWithFallback(props: {
  src: string;
  fallback: ReactNode;
  alt: string;
  style?: React.CSSProperties;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return <>{props.fallback}</>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={props.alt}
      src="image.png"
      style={props.style}
      onLoad={() => setError(false)}
      onError={() => setError(true)}
    />
  );
}
