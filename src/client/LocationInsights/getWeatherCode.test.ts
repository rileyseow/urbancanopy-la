import { describe, expect, it } from 'vitest';

import { getWeatherCode } from '@/client/LocationInsights/getWeatherCode';

describe('getWeatherCode', () => {
  it.each([
    [0, 'Clear sky'],
    [1, 'Mainly clear'],
    [2, 'Partly cloudy'],
    [3, 'Overcast'],
    [45, 'Fog'],
    [48, 'Fog'],
    [51, 'Drizzle'],
    [53, 'Drizzle'],
    [55, 'Drizzle'],
    [61, 'Rain'],
    [63, 'Rain'],
    [65, 'Rain'],
    [80, 'Rain'],
    [81, 'Rain'],
    [82, 'Rain'],
    [56, 'Freezing rain'],
    [57, 'Freezing rain'],
    [66, 'Freezing rain'],
    [67, 'Freezing rain'],
    [71, 'Snow'],
    [73, 'Snow'],
    [75, 'Snow'],
    [77, 'Snow'],
    [85, 'Snow'],
    [86, 'Snow'],
    [95, 'Thunderstorms'],
    [96, 'Thunderstorms'],
    [99, 'Thunderstorms'],
  ])('maps weather code %i to "%s"', (code, label) => {
    const result = getWeatherCode(code);
    expect(result).toMatchObject({ label });
    expect(result.Icon).toBeDefined();
  });

  it.each([999, 10, -1])(
    'returns unavailable for unknown code %i',
    code => {
      const result = getWeatherCode(code);

      expect(result).toMatchObject({
        label: 'Weather code unavailable',
      });

      expect(result.Icon).toBeDefined();
    }
  );
});
