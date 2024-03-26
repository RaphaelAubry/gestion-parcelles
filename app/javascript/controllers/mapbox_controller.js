import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl';

export default class extends Controller {
  static targets = ["parcelle"]

  connect() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFwaGFlbGF1YnJ5IiwiYSI6ImNreXd0b243dTBicTAycHF3eWl0NmFsOGsifQ.lyidIB2GZBCqpr1VUtzqEA';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: JSON.parse(this.parcelleTarget.dataset.centroid),
      zoom: 13
    });
    this.#addPolygon(map, JSON.parse(this.parcelleTarget.dataset.coordinates))
  }

  #addPolygon(map, coordinates) {
    map.on('load', () => {
      map.addSource('parcelle', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': coordinates
          }
        }
      })

      map.addLayer({
        'id': 'parcelle',
        'type': 'fill',
        'source': 'parcelle',
        'layout': {},
        'paint': {
          'fill-color': '#0080ff',
          'fill-opacity': 0.5
        }
      })

      map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'parcelle',
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 2
        }
      })
    })
  }
}
