import { supabase } from '@/server/supabase';
import type { TreeDensityFC } from '@/types/treeDensity.types';

const PAGE_SIZE = 1000;

const fetchTreeDensity =
  async (): Promise<TreeDensityFC> => {
    let data = [];
    let from = 0;

    while (true) {
      const { data: page, error } = await supabase
        .from('tree_density')
        .select('h3_index, geometry, tree_count')
        .order('h3_index')
        .range(from, from + PAGE_SIZE - 1);

      if (error) {
        console.error(
          'Error fetching tree density data from Supabase:',
          error
        );
        throw new Error(
          'Failed to fetch tree density data'
        );
      }

      data.push(...page);

      if (page.length < PAGE_SIZE) {
        break;
      }

      from += PAGE_SIZE;
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
