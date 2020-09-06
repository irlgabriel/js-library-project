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


const booksDiv = document.querySelector("#books-container");
const main = document.querySelector("#main");
const form = document.querySelector('form');
const hideFormBtn = document.querySelector("#hide-form");
const newBookBtn = document.querySelector("#new-book-button");

//function to add book in the DOM
function appendBook(book) {

  //create book div
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("col-10", "col-md-3", "book");


  //button to delete current book from library 
  const deleteButton = document.createElement("btn")
  deleteButton.classList.add("delete-book-button", "btn", "btn-secondary")
  deleteButton.innerHTML = "Delete Book"
  bookDiv.appendChild(deleteButton);

  
  //book's title
  const bookTitle = document.createElement("p");
  bookTitle.innerHTML = book.title;
  bookTitle.classList.add("book-title");

  //book's author
  const bookAuthor = document.createElement("p");
  bookAuthor.innerHTML = book.author;
  bookAuthor.classList.add("book-author");

  //book's genre
  const bookGenre = document.createElement("p");
  bookGenre.innerHTML = book.genre;
  bookGenre.classList.add("book-genre");

  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookGenre);
  booksDiv.appendChild(bookDiv);
  main.appendChild(booksDiv);

  //"Delete book" button to delete current book
  let deleteBookBtns = document.querySelectorAll(".delete-book-button")
  const deleteBookBtn = deleteBookBtns[deleteBookBtns.length - 1]

  deleteBookBtn.addEventListener("click", function() {
    let bookDiv = deleteBookBtn.parentNode  
    bookDiv.remove()
  })

  return bookDiv;
}


//"Add new book" event listener -> brings up book form creation
newBookBtn.addEventListener("click", function() {
  const formPopUp = document.querySelector("#form-popup")
  if(formPopUp.style.display == "block"){
    formPopUp.style.display = "none";
  }
  else {
    formPopUp.style.display = "block";
  }
})

//"Cancel" form button event listener -> hides the book form
hideFormBtn.addEventListener("click", function() {
  document.querySelector("#form-popup").style.display = "none";
})

//Create book through form
form.addEventListener("submit", function(e) {
  e.preventDefault(); 

  const book = new Book

  const formValues = Array.from(this).filter(ele => ele.value !== '').map(ele => ({ name: ele.name, value: ele.value }))
  for(key of formValues) {
    book[key.name] = key.value
  }
  appendBook(book);
  return false;

})


//'seeding' db
myLib = new Library;

myLib.addBook(new Book("Man's search for Meaning", "Viktor Frankl", "Psychology"));
myLib.addBook(new Book("Thinking, fast and slow", "Daniel Kahneman", "Psychology"));
myLib.addBook(new Book("The Republic", "Plato", "Philosophy"));
myLib.addBook(new Book("Sophie's World", "Jostein Gardner", "Philosophy"));
myLib.addBook(new Book("Sophie's World", "Jostein Gardner", "Philosophy"));
myLib.addBook(new Book("Recollections: An Autobiography","Viktor Frankl", "Psychology"));
myLib.addBook(new Book("The Ego and the Id", "Sigmund Freud", "Psychology"));
