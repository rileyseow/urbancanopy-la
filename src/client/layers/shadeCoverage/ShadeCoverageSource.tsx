import { Source } from 'react-map-gl/maplibre';

import { useShadeCoverage } from '@/client/hooks/useLayerData';

const ShadeCoverageSource = () => {
  const { data } = useShadeCoverage();

  if (!data) {
    return null;
  }

  return (
    <Source
      id='shade-coverage-source'
      type='geojson'
      data={data}
    />
  );
};

export default ShadeCoverageSource;
