import mapboxgl from "mapbox-gl"
import { City } from "modules/mapbox/geojsons/city"
import * as Requests from "modules/requests"

mapboxgl.Map.prototype.initializeCurrentCity = function() {
  const point = this.getCenter()

  Requests.getCodeINSEE(point)
    .then(codeINSEE => {
      return Requests.getAPICarto({ code_insee: codeINSEE }, { type: 'commune' })
    })
    .then(data => {
      if (data) {
        const city = new City(data.features[0])
        this.currentCity = city
        this.geocoderControl._inputEl.value = city.properties.nom_com
        this.currentCity.getFeuilles()
        this.currentCity.map = this
        this.getSource('current-city').setData(data)
        //get WMS
      }
    })
    .catch(error => {
      console.log(error.message)
    })
}
