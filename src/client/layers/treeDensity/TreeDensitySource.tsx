import { Source } from 'react-map-gl/maplibre';

import { useTreeDensity } from '@/client/hooks/useLayerData';

const TreeDensitySource = () => {
  const { data } = useTreeDensity();

  if (!data) {
    return null;
  }

  return (
    <Source
      id='tree-density-source'
      type='geojson'
      data={data}
    />
  );
};

export default TreeDensitySource;
