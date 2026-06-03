import useTooltip from '@/client/hooks/useTooltip';
import type { MapLayerId } from '@/constants/MAP_LAYER_IDS';
import { TOOLTIPS } from '@/constants/TOOLTIPS';

const MAP_LAYER_IDS_WITH_TOOLTIPS = Object.keys(
  TOOLTIPS
) as MapLayerId[];

const TooltipManager = () => {
  const { hoveredFeature } = useTooltip({
    layerIds: MAP_LAYER_IDS_WITH_TOOLTIPS,
  });

  const TooltipComponent =
    TOOLTIPS[
      hoveredFeature?.feature.layer.id as MapLayerId
    ];

  return hoveredFeature && TooltipComponent ?
      <TooltipComponent f={hoveredFeature} />
    : null;
};

export default TooltipManager;
