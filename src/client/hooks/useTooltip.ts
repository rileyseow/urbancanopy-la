import { useCallback, useEffect, useState } from 'react';
import {
  useMap,
  type MapLayerMouseEvent,
} from 'react-map-gl/maplibre';

import type { MapLibreFeature } from '@/types/map.types';

/**
 * Custom hook to manage tooltips for MapLibre layers.
 *
 * @param layerIds - Array of MapLibre layer ID strings which should
 * subscribe to tooltip events
 *
 * @returns The currently hovered feature and its coordinates
 */
const useTooltip = ({
  layerIds,
}: {
  layerIds: string[];
}) => {
  const { current: map } = useMap();

  const [hoveredFeature, setHoveredFeature] =
    useState<MapLibreFeature | null>(null);

  const handleMouseMove = useCallback(
    (e: MapLayerMouseEvent) => {
      if (!map) {
        return;
      }
      const feature = e.features?.[0];

      if (!feature) {
        setHoveredFeature(null);
        return;
      }

      setHoveredFeature({
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
        feature,
      });
    },
    [map]
  );

  const handleMouseLeave = useCallback(() => {
    if (!map) {
      return;
    }
    setHoveredFeature(null);
  }, [map]);

  useEffect(() => {
    if (!map) {
      return;
    }

    for (const layerId of layerIds) {
      map.on('mousemove', layerId, handleMouseMove);
      map.on('mouseleave', layerId, handleMouseLeave);
    }

    return () => {
      for (const layerId of layerIds) {
        map.off('mousemove', layerId, handleMouseMove);
        map.off('mouseleave', layerId, handleMouseLeave);
      }
    };
  }, [map, layerIds, handleMouseMove, handleMouseLeave]);

  return {
    hoveredFeature,
  };
};

export default useTooltip;
