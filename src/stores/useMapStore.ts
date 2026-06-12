import { create } from 'zustand';
import { LAYERS, type LayerId } from '@/constants/LAYERS';
import {
  SOURCES,
  type SourceId,
} from '@/constants/SOURCES';

type VisibleLayers = Record<LayerId, boolean>;
type LoadedSources = Record<SourceId, boolean>;

type MapStore = {
  loadedSources: LoadedSources;
  visibleLayers: VisibleLayers;
  setLoadedSource: (
    id: SourceId,
    isLoaded: boolean
  ) => void;
  setVisibleLayer: (
    id: LayerId,
    isVisible: boolean
  ) => void;
};

const DEFAULT_LOADED_SOURCES = Object.fromEntries(
  SOURCES.map(source => [source.id, false])
) as LoadedSources;

const DEFAULT_VISIBLE_LAYERS = Object.fromEntries(
  LAYERS.map(layer => [layer.id, layer.isVisibleByDefault])
) as VisibleLayers;

/**
 * @description Zustand store for managing map state, e.g. visible layers
 */
const useMapStore = create<MapStore>(set => ({
  loadedSources: DEFAULT_LOADED_SOURCES,
  visibleLayers: DEFAULT_VISIBLE_LAYERS,
  setLoadedSource: (id, isLoaded) =>
    set(state => ({
      loadedSources: {
        ...state.loadedSources,
        [id]: isLoaded,
      },
    })),
  setVisibleLayer: (id, isVisible) =>
    set(state => ({
      visibleLayers: {
        ...state.visibleLayers,
        [id]: isVisible,
      },
    })),
}));

export default useMapStore;
