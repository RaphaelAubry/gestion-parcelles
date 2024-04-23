import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    this.element.style.backgroundColor = this.element.dataset.color
  }
}
