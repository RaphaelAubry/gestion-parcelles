import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['parcelle']

  add() {
    var infos = JSON.parse(this.parcelleTarget.dataset.infos)
    var url = '/parcelles/new'
    var geojson = {
      features: [
        { geometry:
          { coordinates: [
              infos.polygon.geometry.coordinates
            ]
          }
        }
      ],
    }
    window.location.href = url +
      `?` +
      `parcelle[reference_cadastrale]=${infos.reference_cadastrale}` +
      `&` +
      `parcelle[code_officiel_geographique]=${infos.code_officiel_geographique}` +
      `&` +
      `parcelle[surface]=${infos.surface}` +
      `&` +
      `parcelle[polygon]=${JSON.stringify(geojson)}`
  }
}
