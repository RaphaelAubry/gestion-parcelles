import mapboxgl from "mapbox-gl"

mapboxgl.Map.prototype.addControlGeolocate = function () {
  this.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }))
}
