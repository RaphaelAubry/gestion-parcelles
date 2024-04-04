import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['label', 'input']

  initialize() {
    if (this.inputTarget.value != '') {
      this.focusLabel()
    }
  }

  focusLabel() {
    this.#move()
  }

  focusoutLabel(event) {
    (this.inputTarget.value != '') ? this.#move() : this.#remove()
  }

  #move() {
    this.labelTarget.classList.add('move')
  }

  #remove() {
    this.labelTarget.classList.remove('move')
  }

}
