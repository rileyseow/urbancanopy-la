import type {
  FeatureCollection,
  LineString,
  Point,
} from 'geojson';

type IngestedGTFS = 'LACMTA_Rail' | 'LACMTA';

/**
 * Enum specified in General Transit Feed Specification (GTFS) Reference
 * to indicate the type of transportation used on a route.
 *
 * @see {@link https://gtfs.org/documentation/schedule/reference/#routestxt}
 */
type GTFSRouteType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 11
  | 12;

export type TransitRouteProperties = {
  /**
   * Unique identifier for the transit route
   * @example 'LACMTA_10-13196'
   */
  route_id: string;

  /**
   * Agency identifier for the transit route
   * @example 'LACMTA'
   */
  agency_id: IngestedGTFS;

  /**
   * Color associated with the route
   * @example 'BF0D3E'
   */
  route_color?: string;

  /**
   * Description of the route
   * @example 'W HOLLYWOOD-DTWN LA -AVALON STA VIA MELROSE-AVALON'
   */
  route_desc?: string;

  /**
   * Full route name
   * @example 'Metro Local Line'
   */
  route_long_name?: string;

  /**
   * Abbreviated route name
   * @example '10/48'
   */
  route_short_name?: string;

  /**
   * White or black associated as foreground against `route_color`
   * @example 'FFFFFF'
   */
  route_text_color?: string;

  /**
   * Enum for the type of route
   * @example 3 (Bus)
   */
  route_type: GTFSRouteType;

  /**
   * URL for further route and operator information
   */
  route_url?: string;
};

export type TransitStopProperties = {
  /**
   * Unique identifier for the transit stop
   * @example 'LACMTA_10012'
   */
  stop_id: string;

  /**
   * Agency identifier for the transit stop
   * @example 'LACMTA'
   */
  agency_id: IngestedGTFS;

  /**
   * Enum for the route type associated with the stop
   * @example 3 (Bus)
   */
  route_type: GTFSRouteType;

  /**
   * Code for the stop
   * @example '10012'
   */
  stop_code: string;

  /**
   * Name of the stop
   * @example 'Greenleaf / Alameda'
   */
  stop_name: string;
};

export type TransitRouteFC = FeatureCollection<
  LineString,
  TransitRouteProperties
>;

export type TransitStopFC = FeatureCollection<
  Point,
  TransitStopProperties
>;
