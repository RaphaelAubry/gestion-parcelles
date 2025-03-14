// Wait for an element to be available in the DOM and return element
function wait(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect
      }
    })

    observer.observe(document.body, {
      subtree: true,
      childList: true
    })
  })
}

export { wait }
