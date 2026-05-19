import { useQuery } from '@tanstack/react-query';

const useParks = () => {
  return useQuery({
    queryKey: ['parks'],
    queryFn: async () => {
      const response = await fetch('/api/poi/parks');
      return response.json();
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useParks;
