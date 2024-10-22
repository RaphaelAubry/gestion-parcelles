import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'
import '../modules/mapbox'
import { InfoControl } from '../modules/mapbox/controls/info_control'
import { SearchControl } from '../modules/mapbox/controls/search_control'

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

    map.addControl(new InfoControl(), 'top-left')
    map.addControl(new SearchControl(), 'top-left')

    map.on('style.load', () => {
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 15
      })
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 })
    })

    if (this.mapTarget.dataset.parcelles) {
      const geometryType = this.mapTarget.dataset.geometryType
      const parcelles = JSON.parse(this.mapTarget.dataset.parcelles)
      map.addPolygons(parcelles, { geometryType: geometryType })
      map.addParcelles(parcelles)
      map.addPopups(parcelles)
    }

    map.addPopupsManager()
    map.addSourceCurrentCity()
    map.addSourceCurrentParcelle()
    map.displayCurrentCity()
    map.displayCurrentParcelle()
  }

  #center() {
    try {
      if (this.mapTarget.dataset.parcelles) {
        return JSON.parse(this.mapTarget.dataset.centroid)
      } else {
        //Paris
        return [2.333333, 48.866667]
      }
    } catch (error) {
     console.log(error.message)
    }
  }
}
