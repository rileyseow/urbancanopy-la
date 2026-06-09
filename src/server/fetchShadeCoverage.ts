import { supabase } from '@/server/supabase';
import computeShadeScore from '@/server/utils/computeShadeScore';
import type { ShadeCoverageFC } from '@/types/shadeCoverage.types';

const PAGE_SIZE = 1000;

const fetchShadeCoverage =
  async (): Promise<ShadeCoverageFC> => {
    let data = [];
    let from = 0;

    while (true) {
      const { data: page, error } = await supabase
        .from('shade_score_view')
        .select(
          'h3_index, geometry, avg_building_height_m, building_coverage_ratio, building_coverage_score, building_height_score, tree_count, tree_density_score'
        )
        .order('h3_index')
        .range(from, from + PAGE_SIZE - 1);

      if (error) {
        console.error(
          'Error fetching shade coverage data from Supabase:',
          error
        );
        throw new Error(
          'Failed to fetch shade coverage data'
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
      features: data.map(
        ({
          h3_index,
          geometry,
          avg_building_height_m,
          building_coverage_ratio,
          tree_count,
          ...rest
        }) => ({
          type: 'Feature',
          geometry: geometry,
          properties: {
            id: h3_index,
            avg_building_height_m,
            building_coverage_ratio,
            shade_score: computeShadeScore(rest),
            tree_count,
          },
        })
      ),
    };
  };

export default fetchShadeCoverage;
