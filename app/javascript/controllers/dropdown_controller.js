import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['menu']

  displayMenu() {
    console.log('yes')
    if (this.menuTarget.style.display === "block") {
      this.menuTarget.style.display = "none";
    } else {
      this.menuTarget.style.display = "block";
    }
  }
}
