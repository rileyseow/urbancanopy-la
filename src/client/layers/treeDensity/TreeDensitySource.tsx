import { Source } from 'react-map-gl/maplibre';

import { useTreeDensity } from '@/client/hooks/useLayerData';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const TreeDensitySource = () => {
  const { data } = useTreeDensity();

  if (!data) {
    return null;
  }

  return (
    <Source
      id={MAP_SOURCE_IDS.treeDensity}
      type='geojson'
      data={data}
    />
  );
};

export default TreeDensitySource;
