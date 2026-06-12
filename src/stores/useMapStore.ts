import { create } from 'zustand';
import { LAYERS, type LayerId } from '@/constants/LAYERS';

type VisibleLayers = Record<LayerId, boolean>;

type MapStore = {
  visibleLayers: VisibleLayers;
  setIsLayerVisible: (
    id: LayerId,
    isVisible: boolean
  ) => void;
};

const DEFAULT_VISIBLE_LAYERS = Object.fromEntries(
  LAYERS.map(layer => [layer.id, layer.isVisibleByDefault])
) as VisibleLayers;

/**
 * @description Zustand store for managing map state, e.g. visible layers
 */
const useMapStore = create<MapStore>(set => ({
  visibleLayers: DEFAULT_VISIBLE_LAYERS,

  setIsLayerVisible: (id, isVisible) =>
    set(state => ({
      visibleLayers: {
        ...state.visibleLayers,
        [id]: isVisible,
      },
    })),
}));

export default useMapStore;
