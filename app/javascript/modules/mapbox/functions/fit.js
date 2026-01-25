import mapboxgl from "mapbox-gl"

mapboxgl.Map.prototype.fit = function() {
  if (this._container?.dataset?.viewType !== 'show') return

  const parcelle = this.parcelles?.[0]

  if (!parcelle?.bbox || parcelle.bbox.length !== 4) return

  const [minLng, minLat, maxLng, maxLat] = parcelle.bbox

  if (![minLng, minLat, maxLng, maxLat].every(Number.isFinite)) return

  this.fitBounds([minLng, minLat, maxLng, maxLat], { padding: 20 });
}