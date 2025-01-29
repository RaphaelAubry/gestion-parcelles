import mapboxgl from "mapbox-gl"
import "mapbox_geocoder"
import { SearchControl } from "modules/mapbox/controls"

mapboxgl.Map.prototype.addInputs = function(location = 'top-left') {
  const geocoder = new MapboxGeocoder({
    accessToken: 'pk.eyJ1IjoicmFwaGFlbGF1YnJ5IiwiYSI6ImNsdWh4aWdhYTE0enQybHJvM2tzNXA2cTMifQ.dhp8bVAsFt9MO-eeFGGY0Q',
    mapboxgl: mapboxgl
  })
  this.geocoderControl = geocoder
  this.addControl(geocoder, location)

  const searchControl = new SearchControl()
  this.searchControl = searchControl
  this.addControl(searchControl, location)

  document.querySelector(".mapboxgl-ctrl-" + location).setAttribute('data-controller', 'input-mapbox')
  geocoder._inputEl.setAttribute('data-input-mapbox-target', 'geocoder')
  searchControl._inputEl.setAttribute('data-input-mapbox-target', 'search')
  searchControl._clearIcon.setAttribute('data-input-mapbox-target', 'clear')
  searchControl._clearIcon.setAttribute('data-action', 'click->input-mapbox#clear')
}
