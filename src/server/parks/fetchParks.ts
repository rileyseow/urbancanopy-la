import { supabase } from '@/server/supabase';
import type {
  ParkPointFC,
  ParkPolygonFC,
} from '@/types/parks.types';

export const fetchParksPoints =
  async (): Promise<ParkPointFC> => {
    const { data, error } = await supabase
      .from('parks_points')
      .select('id, geom, name');

    if (error) {
      console.error(
        'Error fetching parks points from Supabase:',
        error
      );
      throw new Error('Failed to fetch parks points data');
    }

    // return as geojson
    return {
      type: 'FeatureCollection',
      features: data.map(f => ({
        type: 'Feature',
        geometry: f.geom,
        properties: {
          id: f.id,
          name: f.name,
        },
      })),
    };
  };

export const fetchParksPolygons =
  async (): Promise<ParkPolygonFC> => {
    const { data, error } = await supabase
      .from('parks_polygons_geojson')
      .select('id, geom, name');

    if (error) {
      console.error(
        'Error fetching parks polygons from Supabase:',
        error
      );
      throw new Error(
        'Failed to fetch parks polygons data'
      );
    }

    // return as geojson
    return {
      type: 'FeatureCollection',
      features: data.map(f => ({
        type: 'Feature',
        geometry: f.geom,
        properties: {
          id: f.id,
          name: f.name,
        },
      })),
    };
  };
