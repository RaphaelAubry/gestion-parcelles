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
  geocoder.container.querySelector('.mapboxgl-ctrl-geocoder--icon-search').remove()
  geocoder.container.querySelector('.mapboxgl-ctrl-geocoder--pin-right').remove()

  document.querySelector(".mapboxgl-ctrl-" + location).setAttribute('data-controller', 'input-mapbox')

  geocoder._inputEl.style.height = '30px'
  geocoder._inputEl.setAttribute('data-input-mapbox-target', 'geocoder')
  geocoder._inputEl.setAttribute('placeholder', 'Chercher un lieu')

  const geocoderElement = geocoder.container
  geocoderElement.classList.add('search-control')
  const icon = document.createElement('i')
  icon.className = 'mapboxlgl-control-icon search fa fa-light fa-magnifying-glass'
  geocoderElement.prepend(icon)

  const clearIcon = document.createElement('i')
  clearIcon.className = 'mapboxlgl-control-icon clear fa-solid fa-xmark'
  clearIcon.style.display = "none"
  geocoderElement.append(clearIcon)
  geocoder._clearEl = clearIcon
  console.log(geocoder)

  const searchControl = new SearchControl()
  this.searchControl = searchControl
  this.addControl(searchControl, location)

  searchControl._inputEl.style.height = '30px'
  searchControl._inputEl.setAttribute('data-input-mapbox-target', 'search')
  searchControl._clearIcon.setAttribute('data-input-mapbox-target', 'clear2')
  searchControl._clearIcon.setAttribute('data-action', 'click->input-mapbox#clear2')
}
