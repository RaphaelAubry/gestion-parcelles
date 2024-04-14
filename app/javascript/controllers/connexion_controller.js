import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['circle']
  static values = { status: Boolean }

  statusValueChanged(value) {
    if (value == true) {
      this.circleTarget.style.backgroundColor = 'var(--green-fluo)'
    } else if (value == false || value == '') {
      this.circleTarget.style.backgroundColor = 'var(--grey-light-1)'
    }
  }
}
