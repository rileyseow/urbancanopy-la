import type { MapGeoJSONFeature } from 'maplibre-gl';

export type MapLibreFeature = {
  lng: number;
  lat: number;
  feature: MapGeoJSONFeature;
};
