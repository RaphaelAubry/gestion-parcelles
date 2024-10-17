import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['cell']

  linkTo() {
    if (this.cellTarget.dataset.linkShow == "true") {
      location.href = this.cellTarget.parentNode.attributes.href.value
    }
  }
}
