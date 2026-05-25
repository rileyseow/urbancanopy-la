export type ShapeRow = {
  shape_id: string;
  shape_pt_lat: string;
  shape_pt_lon: string;
  shape_pt_sequence: string;
};

/**
 * @note PostGIS can also build LineStrings. For example we could:
 *
 * (1) Insert raw shape-point rows into a temporary table
 * (2) Create point geometries
 * (3) Aggregate LineStrings via `ST_MakeLine(geom ORDER BY shape_pt_sequence)`
 *
 * For now, though, let's keep this as a JS function to avoid complexity of
 * temp tables and DB-side transforms.
 */
const buildLineStrings = (rows: ShapeRow[]) => {
  const grouped = new Map<string, ShapeRow[]>();

  for (const row of rows) {
    if (!grouped.has(row.shape_id)) {
      grouped.set(row.shape_id, []);
    }
    grouped.get(row.shape_id)!.push(row);
  }

  return Array.from(grouped.entries()).map(
    ([shapeId, points]) => {
      const sorted = points.sort(
        (a, b) =>
          Number(a.shape_pt_sequence)
          - Number(b.shape_pt_sequence)
      );

      return {
        shape_id: shapeId,
        geometry: {
          type: 'LineString',
          coordinates: sorted.map(p => [
            Number(p.shape_pt_lon),
            Number(p.shape_pt_lat),
          ]),
        },
      };
    }
  );
};

export default buildLineStrings;
