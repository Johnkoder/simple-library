export default class Book {
  #id = crypto.randomUUID();
  #name;
  #author;
  constructor(name, author) {
    this.#name = name;
    this.#author = author;
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
