"use client";
import { Map as TMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

export default function Map(props: {
  initialPosition?: [number, number];
  zoom?: number;
  height?: number;
  onPositionClick?: (lat: number, long: number) => void;
  mapRef?: React.MutableRefObject<TMap | null>;
  markerRef?: React.MutableRefObject<{
    position: [number, number] | null;
    setPosition: React.Dispatch<
      React.SetStateAction<[number, number] | null>
    >;
  } | null>;
}) {
  const [isClient, setIsClient] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<
    [number, number] | null
  >(null);

  if (props.markerRef) {
    props.markerRef.current = {
      position: markerPosition,
      setPosition: setMarkerPosition,
    };
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <MapContainer
      center={props.initialPosition ?? [59.468784, 6.311468]}
      zoom={props.zoom ?? 13}
      style={{ minHeight: props.height ?? 400 }}
      ref={(map) => {
        if (!props.mapRef) return;
        props.mapRef.current = map;
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler
        onClick={(e) => {
          props.onPositionClick?.(e.latlng.lat, e.latlng.lng);
          setMarkerPosition([e.latlng.lat, e.latlng.lng]);
        }}
      />
      {markerPosition && (
        <CircleMarker center={markerPosition} radius={15} />
      )}
    </MapContainer>
  );
}

function ClickHandler(props: {
  onClick: (e: L.LeafletMouseEvent) => void;
}) {
  const map = useMapEvents({
    click: (e) => {
      props.onClick(e);
    },
  });
  return null;
}
