import mapboxgl from "mapbox-gl"

mapboxgl.Map.prototype.addSourceCurrentParcelle = function() {
  this.addSource('current parcelle', {
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
    id: 'Background_current_parcelle_1',
    type: 'fill',
    source: 'current parcelle',
    layout: {},
    paint: {
      'fill-color': '#FFFFFF',
      'fill-opacity': 0.25
    }
  })

  this.addLayer({
    id: 'Border_current_parcelle_1',
    type: 'line',
    source: 'current parcelle',
    layout: {},
    paint: {
      'line-color': '#FFFFFF',
      'line-width': 2
    }
  })
}
