import { useQuery } from '@tanstack/react-query';

export const useTransitRoutes = () => {
  return useQuery({
    queryKey: ['transit', 'routes'],
    queryFn: async () => {
      const response = await fetch('/api/transit/routes');
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};

export const useTransitStops = () => {
  return useQuery({
    queryKey: ['transit', 'stops'],
    queryFn: async () => {
      const response = await fetch('/api/transit/stops');
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};
