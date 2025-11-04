import Library from './Library.js';
import './styles/library.css';

export default class LibraryUI {
  constructor() {
    this.logic = new Library();
    this.libraryCont = document.querySelector('.library-cont');
    this.libraryForm = this.libraryCont.querySelector('.library-form');
    this.booksCont = this.libraryCont.querySelector('.books-cont');

    this.bookNameInput = this.libraryForm.querySelector('#book-name');
    this.bookAuthorInput = this.libraryForm.querySelector('#author-name');
    this.submitBtn = this.libraryForm.querySelector('input[type="submit"]');
    this.errContForm = this.libraryForm.querySelector('.err-cont-form');

    this.dialogEdit = this.libraryCont.querySelector('.dialog-edit');
    this.dialogForm = this.libraryCont.querySelector('.dialog-form');
    this.bookNameInputEdit = this.dialogForm.querySelector('#book-name-edit');
    this.authorNameInputEdit = this.dialogForm.querySelector('#author-name-edit');
    this.errContEditForm = this.dialogForm.querySelector('.err-cont-edit-form');

    this.cancelBtnEdit = this.dialogForm.querySelector('.cancel-btn-edit');
    this.submitBtnEdit = this.dialogForm.querySelector('input[type="text"]');

    this.currentEditingId = null;
  }

  init() {
    this.handleEvent('submit', this.libraryForm, this.handleSubmitForm);
    this.handleEvent('submit', this.dialogForm, this.handleSubmitFormEdit);
    this.handleEvent('click', this.cancelBtnEdit, this.handleCancelBtn);
    this.createInitialBooks();
    this.renderBooks();
  }

  handleSubmitForm = (e) => {
    e.preventDefault();

    if (!this.bookNameInput.checkValidity()) {
      this.errContForm.textContent = this.bookNameInput.validationMessage;
    } else {
      const nameInput = this.bookNameInput;
      const authorInput = this.bookAuthorInput;
      this.logic.createBook(nameInput.value, authorInput.value);
      nameInput.value = '';
      authorInput.value = '';
      this.renderBooks();

      this.errContForm.textContent = '';
    }
  };

  handleSubmitFormEdit = (e) => {
    e.preventDefault();

    if (!this.bookNameInputEdit.checkValidity()) {
      this.errContEditForm.textContent = this.bookNameInputEdit.validationMessage;
    } else {
      this.logic.updateBook(
        this.currentEditingId,
        this.bookNameInputEdit.value,
        this.authorNameInputEdit.value || 'N/A'
      );

      this.dialogEdit.close();
      this.currentEditingId = null;
      this.renderBooks();

      this.bookNameInputEdit.value = '';
      this.authorNameInputEdit.value = '';

      this.errContEditForm.textContent = '';
    }
  };

  renderBooks() {
    this.removeChildren(this.booksCont);
    this.logic.getBookList.forEach((book) => {
      const bookUi = new BookUi(book, this.libraryCont);
      const bookUiEl = bookUi.getBookEl;

      this.handleEvent('click', bookUi.getDeleteBtn, () => {
        this.logic.deleteBook(book.getId);
        this.renderBooks();
      });
      this.handleEvent('click', bookUi.getUpdateBtn, () => {
        this.handleUpdateBtn(book.getId);
      });

      this.booksCont.append(bookUiEl);
    });
  }

  handleUpdateBtn = (id) => {
    this.currentEditingId = id;
    this.dialogEdit.showModal();
  };

  handleCancelBtn = () => {
    this.bookNameInputEdit.value = '';
    this.authorNameInputEdit.value = '';
    this.currentEditingId = null;
    this.dialogEdit.close();
  };

  createInitialBooks() {
    this.logic.createBook('test', 'test Author');
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

class BookUi {
  constructor(book, libraryCont) {
    this.book = book;
    this.libraryCont = libraryCont;

    this.root = document.createElement('div');
    this.root.className = 'book-item';
    this.root.id = book.getId;
    this.root.innerHTML = `
      <div>
        <p>${this.book.getName}</p>
        <p>${this.book.getAuthor}</p>
      </div>

      <div>
        <button class="delete-btn">Delete</button>
        <button class="update-btn">Update</button>
      </div>
    `;

    this.deleteBtn = this.root.querySelector('.delete-btn');
    this.updateBtn = this.root.querySelector('.update-btn');
  }

  get getBookEl() {
    return this.root;
  }

  get getUpdateBtn() {
    return this.updateBtn;
  }

  get getDeleteBtn() {
    return this.deleteBtn;
  }
}
