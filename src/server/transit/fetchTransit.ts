import { supabase } from '@/server/supabase';
import type {
  TransitRouteFC,
  TransitStopFC,
} from '@/types/transit.types';

export const fetchTransitRoutes =
  async (): Promise<TransitRouteFC> => {
    const { data, error } = await supabase
      .from('gtfs_routes')
      .select(
        'route_id, agency_id, route_color, route_desc, route_long_name, route_short_name, route_text_color, route_type, route_url, gtfs_shapes(geometry)'
      );

    if (error) {
      console.error(
        'Error fetching transit routes from Supabase:',
        error
      );
      throw new Error(
        'Failed to fetch transit routes data'
      );
    }

    // return as geojson
    return {
      type: 'FeatureCollection',
      features: data.map(f => ({
        type: 'Feature',
        geometry: f.gtfs_shapes[0]?.geometry,
        properties: {
          route_id: f.route_id,
          agency_id: f.agency_id,
          route_color: f.route_color || undefined,
          route_desc: f.route_desc || undefined,
          route_long_name: f.route_long_name || undefined,
          route_short_name: f.route_short_name || undefined,
          route_text_color: f.route_text_color || undefined,
          route_type: f.route_type,
          route_url: f.route_url || undefined,
        },
      })),
    };
  };

export const fetchTransitStops =
  async (): Promise<TransitStopFC> => {
    const { data, error } = await supabase
      .from('gtfs_stops')
      .select(
        'stop_id, geometry, agency_id, route_type, stop_code, stop_name'
      );

    if (error) {
      console.error(
        'Error fetching transit stops from Supabase:',
        error
      );
      throw new Error('Failed to fetch transit stops data');
    }

    // return as geojson
    return {
      type: 'FeatureCollection',
      features: data.map(f => ({
        type: 'Feature',
        geometry: f.geometry,
        properties: {
          stop_id: f.stop_id,
          agency_id: f.agency_id,
          route_type: f.route_type,
          stop_code: f.stop_code,
          stop_name: f.stop_name,
        },
      })),
    };
  };
