import { beforeEach, describe, expect, it } from 'vitest';

import { LAYERS, type LayerId } from '@/constants/LAYERS';
import useMapStore from '@/stores/useMapStore';

describe('useMapStore', () => {
  beforeEach(() => {
    useMapStore.setState({
      visibleLayers: Object.fromEntries(
        LAYERS.map(layer => [
          layer.id,
          layer.isVisibleByDefault,
        ])
      ) as Record<LayerId, boolean>,
    });
  });

  it('initializes with layer default visibility', () => {
    expect(useMapStore.getState().visibleLayers).toEqual(
      Object.fromEntries(
        LAYERS.map(layer => [
          layer.id,
          layer.isVisibleByDefault,
        ])
      )
    );
  });

  it('toggles a layer visibility', () => {
    const store = useMapStore.getState();
    const initial = store.visibleLayers.parks;
    store.toggleLayer('parks');

    expect(useMapStore.getState().visibleLayers.parks).toBe(
      !initial
    );
  });

  it('only updates the targeted layer', () => {
    const before = useMapStore.getState().visibleLayers;
    useMapStore.getState().toggleLayer('parks');
    const after = useMapStore.getState().visibleLayers;

    (
      Object.entries(before) as [LayerId, boolean][]
    ).forEach(([layerId, isVisible]) => {
      if (layerId !== 'parks') {
        expect(after[layerId]).toBe(isVisible);
      }
    });
  });

  it('creates a new visibleLayers object when updating', () => {
    const before = useMapStore.getState().visibleLayers;
    useMapStore.getState().toggleLayer('parks');
    const after = useMapStore.getState().visibleLayers;
    expect(after).not.toBe(before);
  });
});
