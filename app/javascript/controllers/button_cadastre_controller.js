import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['button']

  toggle() {
    console.log(this.buttonTarget)
    if (this.buttonTarget.title == 'Mode cadastre activé') {
      this.buttonTarget.title = 'Mode cadastre désactivé'
      this.buttonTarget.classList.toggle('active-control')

    } else if (this.buttonTarget.title = 'Mode cadastre désactivé') {
      this.buttonTarget.title = 'Mode cadastre activé'
      this.buttonTarget.classList.toggle('active-control')
    }
  }
}
