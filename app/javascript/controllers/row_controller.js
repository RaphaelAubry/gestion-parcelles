import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['cell']

  linkTo() {
    location.href = this.cellTarget.parentNode.attributes.href.value
  }
}
