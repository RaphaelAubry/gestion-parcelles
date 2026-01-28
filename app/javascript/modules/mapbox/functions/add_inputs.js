import mapboxgl from "mapbox-gl"
import "mapbox_geocoder"
import { SearchControl } from "modules/mapbox/controls"

mapboxgl.Map.prototype.addInputs = function(location = 'top-left', token) {
  const geocoder = new MapboxGeocoder({
    accessToken: token,
    mapboxgl: mapboxgl
  })

  this.geocoderControl = geocoder
  this.addControl(geocoder, location)
  geocoder.container.querySelector('.mapboxgl-ctrl-geocoder--icon-search').remove()
  geocoder.container.querySelector('.mapboxgl-ctrl-geocoder--pin-right').remove()

  const searchControl = new SearchControl()
  this.searchControl = searchControl
  this.addControl(searchControl, location)

  geocoder._inputEl.style.height = '30px'
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
  
  searchControl._inputEl.style.height = '30px'
 
  document.querySelector(".mapboxgl-ctrl-" + location).setAttribute('data-controller', 'input-mapbox')
}
