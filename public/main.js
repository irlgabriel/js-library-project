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

booksDiv = document.querySelector("#books-container");
main = document.querySelector("#main");


//function to add book in the DOM
function appendBook(book) {

  //create book div
  bookDiv = document.createElement("div");
  bookDiv.classList.add("col-10", "col-md-3", "book");


  //button to delete current book from library 
  deleteBookBtn = document.createElement("btn");
  deleteBookBtn.classList.add("delete-book-button", "btn", "btn-secondary")
  deleteBookBtn.innerHTML = "Delete Book"
  bookDiv.appendChild(deleteBookBtn);

  
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
  main.appendChild(booksDiv);

}


//'seeding' db
myLib = new Library;

myLib.addBook(new Book("Man's search for Meaning", "Viktor Frankl", "Psychology"));
myLib.addBook(new Book("Thinking, fast and slow", "Daniel Kahneman", "Psychology"));
myLib.addBook(new Book("The Republic", "Plato", "Philosophy"));
myLib.addBook(new Book("Sophie's World", "Jostein Gardner", "Philosophy"));
myLib.addBook(new Book("Sophie's World", "Jostein Gardner", "Philosophy"));
myLib.addBook(new Book("Recollections: An Autobiography","Viktor Frankl", "Psychology"));
myLib.addBook(new Book("The Ego and the Id", "Sigmund Freud", "Psychology"));



for(let book of myLib.library) {
  appendBook(book);
}


//"Add new book" event listener -> brings up book form creation
newBookBtn = document.querySelector("#new-book-button");
newBookBtn.addEventListener("click", function() {
  form = document.querySelector("#form-popup")
  if(form.style.display == "block"){
    form.style.display = "none";
  }
  else {
    form.style.display = "block";
  }
})

//"Cancel" form button event listener -> hides the book form
hideFormBtn = document.querySelector("#hide-form");
hideFormBtn.addEventListener("click", function() {
  document.querySelector("#form-popup").style.display = "none";
})

//"Delete book" button to delete current book
deleteBookBtns = document.querySelectorAll(".delete-book-button")
for(deleteBookBtn of deleteBookBtns) {
  deleteBookBtn.addEventListener("click", function() {
    bookDiv = deleteBookBtn.parentNode
    console.log(bookDiv)
  })
}

//"Catch" form and prevent it from being submitted
function processForm(e) {
  if(e.preventDefault) e.preventDefault();

  console.log(e)

  //get form values
  const formValues = Array.from(this).filter(ele => ele.value !== '').map(ele => ({ name: ele.name, value: ele.value }))

  //create book
  book = new Book;

  //assign form values to the new book
  for(key of formValues) {
    book[key.name] = key.value
  }

  //add book to the library
  myLib.addBook(book)

  //add book to the DOM element
  appendBook(book)

  return false;
}

form = document.querySelector('form');

if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
}