import Library from './Library.js';
import './styles/library.css';

export default class LibraryUI {
  constructor() {
    this.logic = new Library();
    this.libraryCont = document.querySelector('.library-cont');
    this.libraryForm = this.libraryCont.querySelector('form');
    this.libraryCont = this.libraryCont.querySelector('.books-cont');

    this.bookNameInput = this.libraryForm.querySelector('#book-name');
    this.bookAuthorInput = this.libraryForm.querySelector('#author-name');
    this.submitBtn = this.libraryForm.querySelector('input[type="submit"]');
  }

  init() {
    console.log(this.libraryForm);
  }

  handleSubmitBtn() {
    return;
  }

  handleEvent(type, el, callback) {
    return;
  }
}
