import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import fetchShadeCoverage from '@/server/fetchShadeCoverage';
import { supabase } from '@/server/supabase';

vi.mock('@/server/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe('fetchShadeCoverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('transforms Supabase rows into GeoJSON features', async () => {
    const page = [
      {
        h3_index: 'abc123',
        geometry: {
          type: 'Polygon',
          coordinates: [],
        },
        avg_building_height_m: 12,
        building_coverage_ratio: 0.4,
        building_coverage_score: 0.5,
        building_height_score: 0.25,
        tree_count: 50,
        tree_density_score: 1,
      },
    ];

    const range = vi.fn().mockResolvedValueOnce({
      data: page,
      error: null,
    });

    const order = vi.fn(() => ({
      range,
    }));

    const select = vi.fn(() => ({
      order,
    }));

    vi.mocked(supabase.from).mockReturnValue({
      select,
    } as any);

    const result = await fetchShadeCoverage();

    expect(result).toMatchObject({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: page[0].geometry,
          properties: {
            id: 'abc123',
            avg_building_height_m: 12,
            building_coverage_ratio: 0.4,
            tree_count: 50,
          },
        },
      ],
    });

    expect(
      result.features[0].properties.shade_score
    ).toBeCloseTo(0.65);
  });

  it('combines paginated results', async () => {
    const page1 = Array.from({ length: 1000 }, (_, i) => ({
      h3_index: `page1-${i}`,
      geometry: null,
      avg_building_height_m: 0,
      building_coverage_ratio: 0,
      building_coverage_score: 0,
      building_height_score: 0,
      tree_count: 0,
      tree_density_score: 0,
    }));

    const page2 = [
      {
        h3_index: 'page2',
        geometry: null,
        avg_building_height_m: 0,
        building_coverage_ratio: 0,
        building_coverage_score: 0,
        building_height_score: 0,
        tree_count: 0,
        tree_density_score: 0,
      },
    ];

    const range = vi
      .fn()
      .mockResolvedValueOnce({
        data: page1,
        error: null,
      })
      .mockResolvedValueOnce({
        data: page2,
        error: null,
      });

    const order = vi.fn(() => ({
      range,
    }));

    const select = vi.fn(() => ({
      order,
    }));

    vi.mocked(supabase.from).mockReturnValue({
      select,
    } as any);

    const result = await fetchShadeCoverage();
    expect(result.features).toHaveLength(1001);
    expect(range).toHaveBeenCalledTimes(2);
  });

  it('throws when Supabase returns an error', async () => {
    const range = vi.fn().mockResolvedValue({
      data: null,
      error: new Error('db error'),
    });

    const order = vi.fn(() => ({
      range,
    }));

    const select = vi.fn(() => ({
      order,
    }));

    vi.mocked(supabase.from).mockReturnValue({
      select,
    } as any);

    await expect(fetchShadeCoverage()).rejects.toThrow(
      'Failed to fetch shade coverage data'
    );
  });
});
