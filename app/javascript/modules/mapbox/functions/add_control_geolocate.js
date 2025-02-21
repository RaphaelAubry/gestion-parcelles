import mapboxgl from "mapbox-gl"
import { wait } from "modules/wait"

mapboxgl.Map.prototype.addControlGeolocate = function () {
  const geolocate = (new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    showAccuracyCircle: true,
    trackUserLocation: true,
    showUserHeading: true
  }))
  this.addControl(geolocate)

  wait('.mapboxgl-ctrl-geolocate > span').then(element => {
    element.title = 'Trouver ma position'
  })
}
