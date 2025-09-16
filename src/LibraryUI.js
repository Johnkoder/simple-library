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
    const nameInput = this.bookNameInput;
    const authorInput = this.bookAuthorInput;
    this.logic.createBook(nameInput.value, authorInput.value);
    nameInput.value = '';
    authorInput.value = '';
    this.renderBooks();
  };

  renderBooks() {
    this.removeChildren(this.booksCont);
    this.logic.getBookList.forEach((book) => {
      const root = document.createElement('div');
      root.className = 'book-item';
      root.innerHTML = `
      <div>
        <p>${book.getName}</p>
        <p>${book.getAuthor}</p>
      <div>

      <div>
        <button class="delete-btn">Delete</button>
        <button class="update-btn">Update</button>
      </div>
    `;

      this.booksCont.append(root);
    });
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

  removeChildren(el) {
    while (el.firstChild) {
      el.removeChild(el.lastChild);
    }
  }
}
