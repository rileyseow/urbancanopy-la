import { describe, expect, it } from 'vitest';

import { SOURCES } from '@/constants/SOURCES';

describe('SOURCES', () => {
  it('contains the expected sources', () => {
    expect(SOURCES.map(source => source.id).sort()).toEqual(
      [
        'bicycleParkingSource',
        'drinkingWaterSource',
        'iceCreamSource',
        'parksSource',
        'shadeCoverageSource',
        'temperatureSource',
        'toiletsSource',
        'transitSource',
        'treeDensitySource',
      ].sort()
    );
  });

  it('has unique source ids', () => {
    const ids = SOURCES.map(source => source.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('defines required source properties', () => {
    SOURCES.forEach(source => {
      expect(source).toMatchObject({
        id: expect.stringMatching(/Source$/),
      });

      expect(source.component).toBeDefined();
      expect(typeof source.component).toBe('function');
    });
  });
});
