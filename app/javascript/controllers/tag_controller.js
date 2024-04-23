import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    console.log(this.element)
    this.element.style.backgroundColor = this.element.dataset.color
  }
}
