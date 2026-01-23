import $ from 'jquery'
import "datatables.net"


$.fn.dataTable.Api.register('setColumnNames', function(headers) {
    // capture de l'instance datatable
    const api = this
    
    api.on('draw', function () {
      updateHeaders(api, headers)
    })   
    updateHeaders(api, headers)
    return api
})


function updateHeaders(table, headers) {
  
  table.rows().every(function() {
    for (let td of this.node().childNodes) {

      if (window.innerWidth < 768) {
        // ajout des headers dans les lignes
        if(!td.querySelector('th')) {
          const name = document.createElement('th')
          
          if (td.dataset.name != "actions") { // on n'affiche pas le header pour la colonne modifier/supprimer
            name.innerText = headers[td.dataset.name]
            td.prepend(name)
          }
        }
      }
    
      if (window.innerWidth >= 768) {
        // suppression des headers dans les lignes
        if(td.querySelector('th')) {
            td.querySelector('th').remove()
        }
      }

    }
  })
}