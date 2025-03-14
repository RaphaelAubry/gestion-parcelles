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

  focusoutLabel() {
    (this.inputTarget.value != '') ? this.#move() : this.#remove()
  }

  #move() {
    this.labelTarget.classList.add('move')
    this.#setPlaceholder()
  }

  #remove() {
    this.labelTarget.classList.remove('move')
    this.inputTarget.setAttribute('placeholder', '')
  }

  #setPlaceholder() {
    const placeholders = { parcelle_reference_cadastrale: 'AD250',
                           parcelle_code_officiel_geographique: 51422,
                           invitation_guest_email: 'email@domaine.com'
    }
    const key = this.inputTarget.getAttribute('id')
    if (key in placeholders) {
      this.inputTarget.setAttribute('placeholder', placeholders[`${key}`])
    }
  }

}
