import type { MapLibreFeature } from '@/types/map.types';
import Tooltip from '@/client/Tooltip';

const ShadeCoverageTooltip = ({
  f,
}: {
  f: MapLibreFeature;
}) => {
  const {
    avg_building_height_m,
    building_coverage_ratio,
    shade_score,
    tree_count,
  } = f.feature.properties;

  let shadeDesc = '-';
  if (shade_score < 0.3) {
    shadeDesc = 'Sparse';
  } else if (shade_score < 0.4) {
    shadeDesc = 'Some';
  } else if (shade_score < 0.6) {
    shadeDesc = 'Moderate';
  } else {
    shadeDesc = 'High';
  }

  return (
    <Tooltip lng={f.lng} lat={f.lat}>
      <span>{shadeDesc} Shade</span>
      <span>estimated in this area</span>
      <span className='small'>
        Building Coverage:{' '}
        {Math.round(building_coverage_ratio * 100)}%
      </span>
      <span className='small'>
        Average Building Height:{' '}
        {avg_building_height_m.toFixed(1)} m
      </span>
      <span className='small'>
        Estimated Trees: {tree_count}
      </span>
    </Tooltip>
  );
};

export default ShadeCoverageTooltip;
