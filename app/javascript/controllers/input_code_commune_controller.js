import { Controller } from "@hotwired/stimulus"
import * as Requests from "modules/requests"

export default class extends Controller {

  town(event) {
    var nom = event.target.value
    document.querySelector("input#parcelle_code_officiel_geographique").value = ""

    Requests.getCommuneINSEE(nom).then(datas => {
      var nodes = this.#createNodes(datas)

      this.#displayList(event)
      var scroll = nodes.length > 1 ? 'scroll' : ''
      document.querySelector('list-1').style.overflowY = scroll
      document.querySelector('list-1').replaceChildren(...nodes)
      if (nodes.length == 0) { document.querySelector('list-1').remove() }
    })

  }

  code(event) {
    document.querySelector("input#parcelle_commune").value = event.target.dataset.nom
    this.#displayList(event)
    document.querySelector('input#parcelle_code_officiel_geographique').value = event.target.dataset.value
    this.#labelMove()
  }

  #labelMove() {
    const input = document.querySelector("input#parcelle_code_officiel_geographique")
    const label = document.querySelector("label[for='parcelle_code_officiel_geographique']")
    input.value == '' ? label.classList.remove('move') : label.classList.add('move')
  }

  #displayList(event) {
    if (event.target.id == 'parcelle_commune') {
      if (document.querySelector('list-1') == null) {
        var list = document.createElement('list-1')
        event.target.parentNode.append(list)
      }
    }

    if (event.target.localName == 'list-item') {
      document.querySelector('list-1').remove()
    }
  }

  #createNodes(datas) {
    datas = datas.sort((obja, objb) => obja.nom > objb.nom)
    const nodes = []
    datas.forEach(data => {
      var element = document.createElement('list-item')
      element.innerText = data.nom + ' - ' + data.code
      element.dataset.value = data.code
      element.dataset.nom = data.nom
      element.dataset.action = 'click->input-code-commune#code'
      nodes.push(element)
    })
    return nodes
  }
}
