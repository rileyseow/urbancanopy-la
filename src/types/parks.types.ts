import type {
  FeatureCollection,
  MultiPolygon,
  Polygon,
} from 'geojson';

export type ParkProperties = {
  /**
   * Unique identifier for the park polygon
   * @example '12523'
   */
  id: string;

  /**
   * Area of the park in acres
   * @example 1196.5940163805446
   */
  acres: number;

  /**
   * Agency responsible for the park's management
   * @example 'Sierra Madre, City of'
   */
  managing_agency?: string;

  /**
   * Name of the park
   * @example 'Sierra Madre City Parkland'
   */
  name: string;
};

export type ParkFC = FeatureCollection<
  Polygon | MultiPolygon,
  ParkProperties
>;
