import Library from './Library.js';
import './styles/library.css';

export default class LibraryUI {
  constructor() {
    this.logic = new Library();
    this.libraryCont = document.querySelector('.library-cont');
    this.libraryForm = this.libraryCont.querySelector('form');
    this.booksCont = this.libraryCont.querySelector('.books-cont');

    this.bookNameInput = this.libraryForm.querySelector('#book-name');
    this.bookAuthorInput = this.libraryForm.querySelector('#author-name');
    this.submitBtn = this.libraryForm.querySelector('input[type="submit"]');
  }

  init() {
    this.handleEvent('submit', this.libraryForm, this.handleSubmitForm);
    this.createInitialBooks();
    this.renderBooks();
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    console.log('SUBMITTED!');
    console.log(this.logic.getBookList);
  };

  renderBooks() {
    return;
  }

  createInitialBooks() {
    this.logic.createBook('test');
  }

  // helper
  handleEvent(type, el, callback) {
    el.addEventListener(type, (e) => {
      callback(e);
    });
  }
}
