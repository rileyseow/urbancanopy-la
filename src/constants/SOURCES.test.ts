import { describe, expect, it } from 'vitest';

import { SOURCES } from '@/constants/SOURCES';

describe('SOURCES', () => {
  it('contains the expected sources', () => {
    expect(SOURCES.map(source => source.id).sort()).toEqual(
      [
        'bicycle-parking-source',
        'drinking-water-source',
        'ice-cream-source',
        'parks-source',
        'shade-coverage-source',
        'temperature-source',
        'toilets-source',
        'transit-routes-source',
        'transit-stops-source',
        'tree-density-source',
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
        id: expect.stringMatching(/-source$/),
      });

      expect(source.component).toBeDefined();
      expect(typeof source.component).toBe('function');
    });
  });
});
