import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets  = ['checkbox', 'form', 'datatable']

  initialize() {
  }

  connect() {
    this.#setColumn()
  }

  disconnect() {
  }

  display() {
    this.#setColumn()
  }

  submit(event) {
    event.preventDefault()

    const formData = new FormData(this.formTarget)

    fetch(this.formTarget.action, {
      method: this.formTarget.method, 
      body: formData,
      headers: { "Accept": "application/json"}
    })
    .then(response => response.json())
    .then(data => { console.log("preferences :", data) })
    .catch(error => console.error("preferences erreur AJAX :", error))
  }

  #setColumn() {
    let count = 0

    for (let box of this.checkboxTargets) {
      if (box.checked == false) { count += 1 }
    }

    const actionTargets = document.querySelectorAll('[data-preferences-target="action"]')
    const displayValue = this.checkboxTargets.length == count ? "none" : ""

    for (let target of actionTargets) {
      target.style.display = displayValue
    }
  }
}