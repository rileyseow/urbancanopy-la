import type { GeoJSONFeature } from 'maplibre-gl';

export type MapLibreFeature = {
  lng: number;
  lat: number;
  feature: GeoJSONFeature;
};
