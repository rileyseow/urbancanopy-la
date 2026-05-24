import type { GeoJSONFeature } from 'maplibre-gl';

export type MapLibreFeature = {
  lng: number;
  lat: number;
  feature: GeoJSONFeature;
};

export type MapLayerId =
  | 'bicycle-parking-layer'
  | 'drinking-water-layer'
  | 'parks-points-layer'
  | 'parks-polygons-layer'
  | 'toilets-layer';
