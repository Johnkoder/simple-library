import Book from './Book.js';

export default class Library {
  #bookList = [];

  get getBookList() {
    return this.#bookList;
  }

  getBook(id) {
    const bookIdx = this.findBookIdx(id);
    return this.#bookList[bookIdx];
  }

  createBook(name, author) {
    const newBook = new Book(name, author);
    this.#bookList.push(newBook);
  }

  deleteBook(id) {
    const bookIdx = this.findBookIdx(id);

    this.#bookList.splice(bookIdx, 1);
  }

  updateBook(id, name, author) {
    const bookIdx = this.findBookIdx(id);
    this.#bookList[bookIdx].setName = name;
    this.#bookList[bookIdx].setAuthor = author;
  }

  // helper
  findBookIdx(id) {
    for (let i = 0; i < this.#bookList.length; i++) {
      if (id === this.#bookList[i].getId) {
        return i;
      }
    }
  }
}
