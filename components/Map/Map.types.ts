import { Map as TMap } from "leaflet";

export type MapProps = {
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
};
