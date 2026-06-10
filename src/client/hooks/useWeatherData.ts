import { useQuery } from '@tanstack/react-query';

import type { Coordinates } from '@/types/map.types';

export const useWeatherForecast = ({
  lng,
  lat,
}: Coordinates) => {
  return useQuery({
    queryKey: ['weather', 'forecast', lng, lat],
    queryFn: async () => {
      const response = await fetch(
        `/api/weather/forecast?lng=${lng}&lat=${lat}`
      );
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
};

export const useWeatherAQI = ({
  lng,
  lat,
}: Coordinates) => {
  return useQuery({
    queryKey: ['weather', 'aqi', lng, lat],
    queryFn: async () => {
      const response = await fetch(
        `/api/weather/aqi?lng=${lng}&lat=${lat}`
      );
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
};
