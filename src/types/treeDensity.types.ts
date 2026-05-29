import type {
  FeatureCollection,
  MultiPolygon,
  Polygon,
} from 'geojson';

export type TreeDensityProperties = {
  /**
   * Unique identifier for the tree polygon cell
   * @example '8829124b21fffff'
   */
  id: string;

  /**
   * Number of trees in the polygon cell
   * @example 292
   */
  tree_count: number;
};

export type TreeDensityFC = FeatureCollection<
  Polygon | MultiPolygon,
  TreeDensityProperties
>;
