"use client";
import { FileDropper } from "@/components/FileDropper.tsx/FileDropper";
import { MapProps } from "@/components/Map/Map.types";
import { getLocationFromSearch } from "@/services/geocoding";
import { clientOnly } from "@/utils/client/clientOnly";
import {
  getImageData,
  imageFileToSrc,
} from "@/utils/client/file";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  ResetIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Card,
  Checkbox,
  DataList,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Map as TMap } from "leaflet";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { RESET_CAMERA_POSITION, useSunVisForm } from "./context";

const createUid = () => {
  return Math.random().toString(36).substr(2, 9);
};

/** Since react-leaflet has no SSR support, we need to dynamically import it */
const Map = dynamic<MapProps>(
  // @ts-ignore
  () => import("@/components/Map/Map"),
  {
    ssr: false,
  }
);

export const CreateSunviReport = clientOnly(() => {
  const router = useRouter();
  const { watch, setValue } = useSunVisForm();
  const [currentGeoTag, setCurrentGeoTag] = useState<
    null | [number, number]
  >(null);
  const mapRef = useRef<TMap>(null);
  const markerRef = useRef<{
    position: [number, number] | null;
    setPosition: React.Dispatch<
      React.SetStateAction<[number, number] | null>
    >;
  }>(null);
  const fileSrc = watch("file");
  const location = watch("location");

  const goToProcessingDisabled = !fileSrc || !location;
  const hasGeoTag = currentGeoTag !== null;

  function setLocation(lat: number, lon: number) {
    setValue("location", { lat, lon });
    markerRef.current?.setPosition([lat, lon]);
    mapRef.current?.setView([lat, lon], 16);
  }

  const onFileDrop = async (file: File) => {
    setValue("file", imageFileToSrc(file));
    try {
      const data = await getImageData(file);
      const lat = data.latitude;
      const lon = data.longitude;

      setValue("location", {
        lat,
        lon,
      });
      if (data.angle !== null) {
        setValue("angle", data.angle);
      }
      setLocation(lat, lon);
      setCurrentGeoTag([lat, lon]);
    } catch (e) {
      setCurrentGeoTag(null);
      markerRef.current?.setPosition(null);
      mapRef.current?.setView(RESET_CAMERA_POSITION, 6);
      setValue("location", null);
    }
  };

  const onTextFieldEnter = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    const location = await getLocationFromSearch(value);
    if (location) {
      mapRef.current?.setView([location.lat, location.lon], 16);
      markerRef.current?.setPosition([
        location.lat,
        location.lon,
      ]);
      setValue("location", location);
    }
  };

  return (
    <Flex direction="column" gap="5">
      <Heading size="5">Create new Sun Report</Heading>
      <Flex direction={{ initial: "column", md: "row" }} gap="5">
        <DataList.Root
          orientation="vertical"
          style={{ flex: 2 }}
        >
          <DataList.Item>
            <DataList.Label>1. Upload your image</DataList.Label>
            <DataList.Value>
              <Flex
                direction="column"
                gap="2"
                style={{ width: "100%" }}
              >
                <FileDropper
                  onChange={async (files) => {
                    if (files[0]) {
                      onFileDrop(files[0]);
                    }
                  }}
                  maxFiles={1}
                  accept="image/*"
                  style={{ maxWidth: "100%" }}
                />
                {
                  <Callout.Root
                    variant="soft"
                    color="gray"
                    size="1"
                  >
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      Check out our <Link href="#">guide</Link>{" "}
                      on how to take good pictures.
                    </Callout.Text>
                  </Callout.Root>
                }
                {hasGeoTag && (
                  <Callout.Root
                    variant="soft"
                    color="teal"
                    size="1"
                  >
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      Your picture is geotagged, we have
                      automatically extracted the GPS
                      coordinates.
                    </Callout.Text>
                  </Callout.Root>
                )}

                {fileSrc && !hasGeoTag && (
                  <Callout.Root
                    variant="soft"
                    color="bronze"
                    size="1"
                  >
                    <Callout.Icon>
                      <ExclamationTriangleIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      Your picture is not geotagged, please
                      select location manually.
                    </Callout.Text>
                  </Callout.Root>
                )}
              </Flex>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <DataList.Root
          orientation="vertical"
          style={{ flex: 3 }}
        >
          <DataList.Item>
            <DataList.Label>2. Select location</DataList.Label>
            <DataList.Value>
              <Flex
                direction="column"
                gap="5"
                style={{ width: "100%" }}
              >
                <Card>
                  <Flex direction="column" gap="2">
                    <Flex direction="row" gap="3" align="center">
                      <TextField.Root
                        placeholder="Search"
                        variant="soft"
                        color="gray"
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            onTextFieldEnter(e);
                          }
                        }}
                        style={{ width: "100%" }}
                      >
                        <TextField.Slot>
                          <MagnifyingGlassIcon
                            width="16"
                            height="16"
                          />
                        </TextField.Slot>
                      </TextField.Root>
                      {hasGeoTag && (
                        <Button
                          size="2"
                          variant="soft"
                          color="gray"
                          onClick={() => {
                            setLocation(
                              currentGeoTag[0],
                              currentGeoTag[1]
                            );
                          }}
                        >
                          <ResetIcon />
                          Reset to image geotag
                        </Button>
                      )}
                    </Flex>
                    <div
                      style={{
                        width: "100%",
                        height: 400,
                        borderRadius: "var(--radius-2)",
                        overflow: "hidden",
                      }}
                    >
                      <Map
                        height={400}
                        zoom={6}
                        initialPosition={RESET_CAMERA_POSITION}
                        mapRef={mapRef}
                        markerRef={markerRef}
                        onPositionClick={(lat, lon) => {
                          setValue("location", {
                            lat,
                            lon,
                          });
                        }}
                      />
                    </div>
                  </Flex>
                </Card>
              </Flex>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Flex>
      <Text as="label" size="2">
        <Flex gap="2">
          <Checkbox defaultChecked />I have read and agree to the{" "}
          <Link href="#">terms and conditions</Link>
        </Flex>
      </Text>
      <Button
        size="4"
        variant="solid"
        onClick={() =>
          router.push(`/sunvi/processing/${createUid()}`)
        }
        color="teal"
        disabled={goToProcessingDisabled}
      >
        {goToProcessingDisabled ? (
          "Select image & location to proceed"
        ) : (
          <>
            Create new report
            <RocketIcon />
          </>
        )}
      </Button>
      {/* Scroll breathing room */}
      <div style={{ height: "70px" }} />
    </Flex>
  );
});
