import { describe, expect, it } from 'vitest';

import { LAYERS } from '@/constants/LAYERS';

describe('LAYERS', () => {
  it('contains the expected layers', () => {
    expect(LAYERS.map(layer => layer.id).sort()).toEqual(
      [
        'bicycleParking',
        'drinkingWater',
        'iceCream',
        'parks',
        'shadeCoverage',
        'temperature',
        'toilets',
        'transit',
        'treeDensity',
      ].sort()
    );
  });

  it('has unique ids', () => {
    const ids = LAYERS.map(layer => layer.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('defines required layer properties', () => {
    LAYERS.forEach(layer => {
      expect(layer).toMatchObject({
        id: expect.any(String),
        label: expect.any(String),
        isVisibleByDefault: expect.any(Boolean),
      });

      expect(layer.icon).toBeDefined();
      expect(layer.component).toBeDefined();
    });
  });

  it('uses the expected default visibility', () => {
    const visibility = Object.fromEntries(
      LAYERS.map(layer => [
        layer.id,
        layer.isVisibleByDefault,
      ])
    );

    expect(visibility).toMatchObject({
      parks: true,
      transit: true,
      drinkingWater: true,
    });
  });
});
