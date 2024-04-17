import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['checkbox', 'col', 'table', 'form']

  connect() {
    this.#setColumns()
  }

  display() {
    this.#setColumns()
    this.formTarget.submit()
  }

  #setColumns() {
    const column_name = this.colTarget.attributes.name.value
    const column_cells = document.querySelectorAll(`table [data-column-name="${column_name}"]`)
    const display = this.checkboxTarget.checked
    column_cells.forEach(cell => { cell.style.display = display == true ? "" : "none" })
  }
}
