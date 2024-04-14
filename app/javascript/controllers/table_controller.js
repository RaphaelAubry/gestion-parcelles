import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['row']

  linkTo() {
    location.href = this.rowTarget.parentNode.attributes.href.value
  }
}
