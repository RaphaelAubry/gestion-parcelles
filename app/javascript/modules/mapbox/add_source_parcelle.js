import mapboxgl from 'mapbox-gl'

mapboxgl.Map.prototype.addSourceParcelle = function () {
  this.on('load', (e) => {
    this.addSource('parcelle', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[]]
        }
      }
    })
    this.addLayer({
      id: 'parcelle 1',
      type: 'line',
      source: 'parcelle',
      layout: {},
      paint: {
        'line-color': '#FFFFFF',
        'line-width': 3
      }
    })
  })
}
