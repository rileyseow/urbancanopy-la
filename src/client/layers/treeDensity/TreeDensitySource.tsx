import { Source } from 'react-map-gl/maplibre';

import useTooltip from '@/client/hooks/useTooltip';
import TreeDensityTooltip from '@/client/layers/treeDensity/TreeDensityTooltip';
import { useTreeDensity } from '@/client/hooks/useLayerData';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const TreeDensitySource = () => {
  const { data } = useTreeDensity();

  const { hoveredFeature } = useTooltip({
    layerIds: [MAP_LAYER_IDS.treeDensity],
  });

  if (!data) {
    return null;
  }

  return (
    <>
      <Source
        id='tree-density-source'
        type='geojson'
        data={data}
      />
      {hoveredFeature && (
        <TreeDensityTooltip f={hoveredFeature} />
      )}
    </>
  );
};

export default TreeDensitySource;
