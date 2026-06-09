import { describe, expect, it } from 'vitest';

import computeShadeScore from '@/server/utils/computeShadeScore';

describe('computeShadeScore', () => {
  it('computes weighted shade score', () => {
    expect(
      computeShadeScore({
        tree_density_score: 1,
        building_coverage_score: 0.5,
        building_height_score: 0.25,
      })
    ).toBeCloseTo(0.65);
  });
});
