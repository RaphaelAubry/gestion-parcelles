import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['surface', 'quantity', 'price', 'amount']

  connect() {
    this.updateAmount()
  }
  
  updateAmount() {
    let surface = this.surfaceTarget.value
    let quantity = this.quantityTarget.value
    let price = this.priceTarget.value
    this.amountTarget.value = surface * quantity * price
  }
}