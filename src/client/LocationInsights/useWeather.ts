import { useQuery } from '@tanstack/react-query';

export const useWeatherForecast = () => {
  return useQuery({
    queryKey: ['weather', 'forecast'],
    queryFn: async () => {
      const response = await fetch('/api/weather/forecast');
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
};

export const useWeatherAQI = () => {
  return useQuery({
    queryKey: ['weather', 'aqi'],
    queryFn: async () => {
      const response = await fetch('/api/weather/aqi');
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
};
