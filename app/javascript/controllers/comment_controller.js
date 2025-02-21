import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // No upload button
    document.addEventListener("trix-initialize", (event) => {
      const fileTools = document.querySelector(".trix-button-group--file-tools")
      fileTools?.remove()
    })

    // No copy paste
    document.addEventListener("trix-attachment-add", (event) => {
      if (!event.attachment.file) {
        event.attachment.remove()
      }
    })

    // No attachments
    document.addEventListener("trix-file-accept", (event) => {
      event.preventDefault();
    });

    Trix.config.lang.bold = 'Gras'
    Trix.config.lang.italic = 'Italic'
    Trix.config.lang.strike = 'Barré'
    Trix.config.lang.link = 'Lien hypertexte'
    Trix.config.lang.urlPlaceholder = 'Entrer une adresse...'
    Trix.config.lang.link = 'Lien'
    Trix.config.lang.unlink = 'Supprimer'
    Trix.config.lang.heading1 = 'Titre'
    Trix.config.lang.quote = 'Citation'
    Trix.config.lang.code = 'Code'
    Trix.config.lang.bullets = 'Puces'
    Trix.config.lang.numbers = 'Numérotation'
    Trix.config.lang.indent = 'Augmenter niveau'
    Trix.config.lang.outdent = 'Réduire le niveau'
    Trix.config.lang.undo = 'Retour'
    Trix.config.lang.redo = 'Avance'
    Trix.config.lang.captionPlaceholder = 'Ajouter une légende...'
    Trix.config.lang.remove = 'Supprimer'
    Trix.config.lang.attachFiles = 'Insérer fichiers'
  }

  clear() {
    this.element.querySelectorAll('input[name="comment[images][]"]').forEach(input => {
      input.value = ''
    })
    this.element.reset()
    this.element.querySelector('input#comment_images').removeAttribute('disabled')
  }
}
