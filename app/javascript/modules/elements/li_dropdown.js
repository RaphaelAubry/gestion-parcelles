class LiDropdown extends HTMLElement {
  constructor() {
    super()
    this.ul = this.querySelector('ul')
    this.liDropdowns = this.parentElement.querySelectorAll('li-dropdown')
    this.onclick = function() {
      for (let element of this.liDropdowns) {
        if (element.ul.style.display == 'block' && this != element) {
          element.ul.style.display = 'none'
        }
      }
      
      switch (this.ul.style.display) {
      case '':
        this.ul.style.display = 'block'
        break
      case 'none':
        this.ul.style.display = 'block'
        break
      case 'block':
        this.ul.style.display = 'none'
        break
      }
    }
  }
}

customElements.define('li-dropdown', LiDropdown)
