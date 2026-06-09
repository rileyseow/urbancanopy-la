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

export default computeShadeScore;
