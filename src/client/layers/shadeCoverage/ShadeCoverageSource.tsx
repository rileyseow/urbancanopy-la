import { Source } from 'react-map-gl/maplibre';

import { useShadeCoverage } from '@/client/hooks/useLayerData';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const ShadeCoverageSource = () => {
  const { data } = useShadeCoverage();

  if (!data) {
    return null;
  }

  return (
    <Source
      id={MAP_SOURCE_IDS.shadeCoverage}
      type='geojson'
      data={data}
    />
  );
};

export default ShadeCoverageSource;
