import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets  = ['checkbox', 'form']

  connect() {
    this.#setColumn()
  }

  submit() {
    this.formTarget.submit()
  }

  display() {
    this.#setColumn()
  }

  #setColumn() {
    let count = 0

    for (let box of this.checkboxTargets) {
      if (box.checked == false) { count += 1 }
    }

    const actionTargets = document.querySelectorAll('[data-boxes-target="action"]')
    const displayValue = this.checkboxTargets.length == count ? "none" : ""

    for (let target of actionTargets) {
      target.style.display = displayValue
    }
  }
}
