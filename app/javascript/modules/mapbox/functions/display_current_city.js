import mapboxgl from "mapbox-gl"
import { City } from "modules/mapbox/geojsons/city"
import * as Requests from "modules/requests"
import "modules/arrays/find_attribute"

mapboxgl.Map.prototype.currentCityChanged = function(city) {
  if (this.currentCity != null) {
    return this.currentCity.properties.nom_com != city.properties.nom_com
  }
}

mapboxgl.Map.prototype.displayCurrentCity = function() {
  
  this.on('moveend', (e) => {
    const point = this.getCenter()
  
    Requests.getReverseGeocode(point)
      .then(data => {
   
        switch (data.context.findAttribute('country').text) {
          case 'France':

            Requests.getCodeINSEE(point)
              .then(codeINSEE => {
                return Requests.getAPICarto({ code_insee: codeINSEE }, { type: 'commune' })
              })
              .then(data => {
                if (data) {
                  const city = new City(data.features[0])
                  if (this.currentCityChanged(city)) {
                    this.searchControl.reset()
                    this.currentCity = city
                    this.geocoderControl._inputEl.value = city.properties.nom_com
                    this.currentCity.getFeuilles()
                    this.currentCity.map = this
                    this.getSource('current-city').setData(data)
                    //get WMS
                  }
                }
              })
              .catch(error => {
                console.log(error.message)
              })
          break

          default:
            const city = new City()
            city.properties.nom_com = data.context.findAttribute('place').text
            this.currentCity = city
            this.geocoderControl._inputEl.value = city.properties.nom_com
            this.currentCity.map = this
        }
    })
    .catch(error => {
      console.log(error.message)
    })
  })
}
