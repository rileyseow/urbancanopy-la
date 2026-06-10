import type { MapGeoJSONFeature } from 'maplibre-gl';

export type Coordinates = {
  lng: number;
  lat: number;
};

export type MapLibreFeature = Coordinates & {
  feature: MapGeoJSONFeature;
};
