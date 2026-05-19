import parksQuery from '@/server/parks/parksQuery';
import { OVERPASS_URL, USER_AGENT } from '@/server/config';

const fetchParks = async () => {
  const query = parksQuery();

  const response = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: {
      'User-Agent': USER_AGENT,
    },
    body: new URLSearchParams({ data: query }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch parks: ${response.status} ${response.statusText}. ${errorText}`
    );
  }

  return response.json();
};

export default fetchParks;
