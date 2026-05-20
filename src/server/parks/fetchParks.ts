import { LOS_ANGELES_BOUNDS } from '@/constants/MAP';
import parksQuery from '@/server/parks/parksQuery';
import { OVERPASS_URL, USER_AGENT } from '@/server/config';

const fetchParks = async () => {
  const query = parksQuery({
    lat1: LOS_ANGELES_BOUNDS[1],
    lng1: LOS_ANGELES_BOUNDS[0],
    lat2: LOS_ANGELES_BOUNDS[3],
    lng2: LOS_ANGELES_BOUNDS[2],
  });

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
