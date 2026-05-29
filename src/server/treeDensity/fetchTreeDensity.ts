import { supabase } from '@/server/supabase';
import type { TreeDensityFC } from '@/types/treeDensity.types';

const fetchTreeDensity =
  async (): Promise<TreeDensityFC> => {
    const { data, error } = await supabase
      .from('tree_density')
      .select('h3_index, geometry, tree_count');

    if (error) {
      console.error(
        'Error fetching tree density polygons from Supabase:',
        error
      );
      throw new Error(
        'Failed to fetch tree density polygons data'
      );
    }

    // return as geojson
    return {
      type: 'FeatureCollection',
      features: data.map(f => ({
        type: 'Feature',
        geometry: f.geometry,
        properties: {
          id: f.h3_index,
          tree_count: f.tree_count,
        },
      })),
    };
  };

export default fetchTreeDensity;
