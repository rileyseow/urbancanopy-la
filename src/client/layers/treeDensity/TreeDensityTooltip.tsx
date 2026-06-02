import type { MapLibreFeature } from '@/types/map.types';

import Tooltip from '@/client/Tooltip';

const TreeDensityTooltip = ({
  f,
}: {
  f: MapLibreFeature;
}) => {
  const { tree_count } = f.feature.properties;
  return (
    <Tooltip lng={f.lng} lat={f.lat}>
      <span>
        {tree_count.toLocaleString()} estimated trees in
        this area
      </span>
    </Tooltip>
  );
};

export default TreeDensityTooltip;
