import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['percentage', 'quantity', 'price', 'amount']

  connect() {
    this.updateAmount()
  }
  
  updateAmount() {
    let percentage = this.percentageTarget.value / 100
    let quantity = this.quantityTarget.value
    let price = this.priceTarget.value
    this.amountTarget.value = percentage * quantity * price
  }
}