function Library() {
  this.library = [];

}

Library.prototype.addBook = function(book) {
  this.library.push(book)
}

function Book(title, author, genre) {
  this.title = title
  this.author = author
  this.genre = genre

}

myLib = new Library;

myLib.addBook(new Book("Man's search for Meaning", "Viktor Frankl", "Psychology"));
myLib.addBook(new Book("Thinking, fast and slow", "Daniel Kahneman", "Psychology"));
myLib.addBook(new Book("The Republic", "Plato", "Philosophy"));
myLib.addBook(new Book("Sophie's World", "Jostein Gardner", "Philosophy"));
myLib.addBook(new Book("Sophie's World", "Jostein Gardner", "Philosophy"));
myLib.addBook(new Book("Recollections: An Autobiography","Viktor Frankl", "Psychology"));
myLib.addBook(new Book("The Ego and the Id", "Sigmund Freud", "Psychology"));


booksDiv = document.querySelector("#books-container");

for(let book of myLib.library) {
  //create book div
  bookDiv = document.createElement("div");
  bookDiv.classList.add("col-10", "col-md-3", "book");

  //book's title
  bookTitle = document.createElement("p");
  bookTitle.innerHTML = book.title;
  bookTitle.classList.add("book-title");

  //book's author
  bookAuthor = document.createElement("p");
  bookAuthor.innerHTML = book.author;
  bookAuthor.classList.add("book-author");

  //book's genre
  bookGenre = document.createElement("p");
  bookGenre.innerHTML = book.genre;
  bookGenre.classList.add("book-genre");

  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookGenre);

  booksDiv.appendChild(bookDiv);


}