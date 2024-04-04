import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['dropdown', 'link']

  submit() {
    this.linkTarget.href += '?' + this.dropdownTarget.name + '=' + this.dropdownTarget.value
    this.linkTarget.click()
  }
}
