import mapboxgl from "mapbox-gl"

mapboxgl.Map.prototype.addControlFullscreen = function () {
  const fullscreen = new mapboxgl.FullscreenControl()
  this.addControl(fullscreen)
  fullscreen._fullscreenButton.querySelector('span.mapboxgl-ctrl-icon').title = "Plein écran"
}
