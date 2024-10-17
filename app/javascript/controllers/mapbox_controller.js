import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'
import '../modules/mapbox'

export default class extends Controller {
  static targets = ['map']

  connect() {

    mapboxgl.accessToken = 'pk.eyJ1IjoicmFwaGFlbGF1YnJ5IiwiYSI6ImNsdWh4aWdhYTE0enQybHJvM2tzNXA2cTMifQ.dhp8bVAsFt9MO-eeFGGY0Q'

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: this.#center(),
      zoom: 15
    })
    map.addControl(new mapboxgl.FullscreenControl())
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      })
    )
    map.on('style.load', () => {
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 15
      })
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 })
    })

    const geometryType = this.mapTarget.dataset.geometryType
    const parcelles = JSON.parse(this.mapTarget.dataset.parcelles)

    map.on('load', () => {
      map.addPolygons(parcelles, {
        geometryType: geometryType
      })
    })
    map.addPopups(parcelles)
    map.addSourceCity()
    map.addCity()
    map.addSourceParcelle()
    map.displayParcelle()
  }

  #center() {
    try {
      return JSON.parse(this.mapTarget.dataset.centroid)
    } catch (error) {
      // error comes from centroid format must be [float, float]
      // from average coordinates x and y of polygons
      // Mont-Blanc coordinates
      return [6.865575, 45.832119]
    }
  }
}
