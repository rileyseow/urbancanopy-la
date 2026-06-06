import { supabase } from '@/server/supabase';
import type { ShadeCoverageFC } from '@/types/shadeCoverage.types';

const PAGE_SIZE = 1000;

interface SupabaseShadeScores {
  /**
   * Score representing the proportion of square area covered
   * by building footprint in the polygon cell. Normalized
   * between 0 and 1.
   * @example 0.0251088758245022
   */
  building_coverage_score: number;

  /**
   * Score representing the average building height in the
   * polygon cell compared against the 99.9th percentile
   * average across cells. Normalized between 0 and 1.
   * @example 0.129894383634974
   */
  building_height_score: number;

  /**
   * Score representing the number of estimated trees in the
   * polygon cell compared against the 99.9th percentile of
   * estimated trees across cells. Normalized between 0 and 1.
   * @example 1
   */
  tree_density_score: number;
}

/**
 * Computes an aggregated shade score value from tree density, building
 * coverage, and building height scores. Normalized between 0 and 1.
 *
 * @note on weighting - Tall buildings can create substantial shade
 * even where tree density is low, while large tree canopies can create
 * substantial shade even where buildings are sparse. Building height
 * mostly affects shadow length and time-of-day persistence.
 */
const computeShadeScore = (scores: SupabaseShadeScores) =>
  scores.tree_density_score * 0.4
  + scores.building_coverage_score * 0.4
  + scores.building_height_score * 0.2;

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
