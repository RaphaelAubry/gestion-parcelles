import $ from 'jquery'
import "datatables.net"

$.fn.dataTable.Api.register('setColumnNames', function() {
   console.log('set')
   console.log(this)
    if (window.innerWidth < 768) {
      console.log('set1')
      console.log(this.rows())
      this.rows().every(function(row) {
        this.node().childNodes.forEach((td) => {
            if(!td.querySelector('th')) {
              const name = document.createElement('th')
              name.innerText = headers[td.dataset.name]
              td.prepend(name)
            }
        })
      })
    }
    
    if (window.innerWidth >= 768) {
      
      this.rows().every(function(row) {
        this.node().childNodes.forEach((td) => {
            if(td.querySelector('th')) {
              td.querySelector('th').remove()
            }
        })
      })

    }
    return this
  
})