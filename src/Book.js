export default class Book {
  #id = crypto.randomUUID();
  #name;
  #author;
  constructor(name, author) {
    this.#name = name === '' ? 'N/A' : name;
    this.#author = author || 'N/A';
  }

  set setName(name) {
    this.#name = name;
  }
  set setAuthor(author) {
    this.#author = author;
  }

  get getId() {
    return this.#id;
  }

  get getName() {
    return this.#name;
  }

  get getAuthor() {
    return this.#author;
  }
}
