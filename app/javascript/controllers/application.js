import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

console.log('ok')
document.addEventListener('scroll', event => {
  console.log(event)
  console.log(document.querySelector('thead').getBoundingClientRect().top)
})