import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['select']

  connect() {
    this.update()
  }

  update() {
    this.element.querySelector('a').href = `/invoices/new?contract_id=${this.selectTarget.value}`
  }
}