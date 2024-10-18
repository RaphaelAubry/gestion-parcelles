import mapboxgl from 'mapbox-gl'

mapboxgl.Map.prototype.addSourceCity = function () {
  this.on('load', (e) => {
    this.addSource('current city', {
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
      id: 'Border_current_city_1',
      type: 'line',
      source: 'current city',
      layout: {},
      paint: {
        'line-color': '#000',
        'line-width': 3
      }
    })
  })
}
