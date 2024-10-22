import mapboxgl from "mapbox-gl"
import { City } from "modules/mapbox/geojsons/city"
import * as Requests from "modules/requests"

mapboxgl.Map.prototype.currentCity = new City({
                                        type: "Feature",
                                        id: "commune.7681",
                                        geometry: {
                                        type: "MultiPolygon",
                                        coordinates: []
                                        },
                                        geometry_name: "geom",
                                        properties: {
                                        nom_com: "Paris 01",
                                        code_dep: "75",
                                        code_insee: "75101"
                                        },
                                        bbox: []
})

mapboxgl.Map.prototype.currentCityChanged = function(city) {
  if (this.currentCity != null) {
    return this.currentCity.properties.nom_com != city.properties.nom_com
  }
}

mapboxgl.Map.prototype.displayCurrentCity = function() {
    this.on('moveend', (e) => {
    const point = this.getCenter()
    Requests.getCodeINSEE(point)
      .then(codeINSEE => {
        return Requests.getAPICarto({ code_insee: codeINSEE }, { type: 'commune' })
      })
      .then(data => {
        const source = this.getSource('current city')
        if (data) {
          const city = new City(data.features[0])
          if (this.currentCityChanged(city)) {
            this.currentCity = city
            this.currentCity.getFeuilles()
            this.currentCity.map = this
            source.setData(data)
          }
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  })
}
