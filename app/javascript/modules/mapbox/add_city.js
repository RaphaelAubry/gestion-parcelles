import mapboxgl from 'mapbox-gl'
import * as Requests from '../requests'
import { City } from './geojsons/city'

mapboxgl.Map.prototype.addCity = function () {
  this.on('moveend', (e) => {
    const point = this.getCenter()
    Requests.getCodeINSEE(point)
      .then(codeINSEE => {
        return Requests.getAPICarto({ code_insee: codeINSEE }, { type: 'commune' })
      })
      .then(data => {
        const source = this.getSource('city')
        if (data) {
          mapboxgl.Map.prototype.city = new City(data.features[0])
          source.setData(data)
          this.city.getFeuilles()
          this.city.map = this
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  })
}
