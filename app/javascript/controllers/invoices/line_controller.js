import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['button']

  updateLine() {
    if (this.buttonTarget.dataset.status == 'delete') {
      this.element.querySelectorAll('input-group').forEach(element => {
        element.style.display = 'none'
      })
      this.element.querySelector('input[name*="[_destroy]"]').value = true
      this.buttonTarget.innerText = 'Ajouter sur la facture'
      this.buttonTarget.dataset.status = 'add'

    } else if (this.buttonTarget.dataset.status == 'add') {
      this.element.querySelectorAll('input-group').forEach(element => {
        element.style.display = ''
      })
      this.element.querySelector('input[name*="[_destroy]"]').value = false
      this.buttonTarget.innerText = 'Supprimer de la facture'
      this.buttonTarget.dataset.status = 'delete'
    }


  }
}