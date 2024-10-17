import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets  = ['checkbox']

  connect() {
    this.#setColumn()
  }

  display() {
    this.#setColumn()
  }

  #setColumn() {
    let count = 0
    this.checkboxTargets.forEach(box => { if (box.checked == false) { count += 1 } })
    const actionTargets = document.querySelectorAll('[data-boxes-target="action"]')
    const displayValue = this.checkboxTargets.length == count ? "none" : ""
    actionTargets.forEach(target => { target.style.display = displayValue })
  }
}
