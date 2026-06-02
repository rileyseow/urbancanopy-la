import { useQuery } from '@tanstack/react-query';

export const useParks = () => {
  return useQuery({
    queryKey: ['parks'],
    queryFn: async () => {
      const response = await fetch('/api/parks');
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};
