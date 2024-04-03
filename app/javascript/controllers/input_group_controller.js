import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['label', 'input']

  connect() {
    console.log('ok')
  }

  initialize() {
    if (this.inputTarget.value != '') {
      this.focusLabel()
    }
    console.log('ok')
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
