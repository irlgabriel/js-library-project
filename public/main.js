//firestore db
const db = firebase.firestore()

function Library() {
  this.library = [];
}

Library.prototype.addBook = function(doc) {
  this.library.push(new Book(doc))
  renderBook(doc)
}

function Book(doc) {
  this.title = this.getTitle
  this.author = this.getAuthor
  this.genre = this.getGenre
}

Book.prototype.getTitle = () => {
  this.data().title
}

Book.prototype.getAuthor = () => {
  this.data().author
}

Book.prototype.getGenre = () => {
  this.data().genre
}


const booksDiv = document.querySelector("#books-container");
const main = document.querySelector("#main");
const form = document.querySelector('form');
const hideFormBtn = document.querySelector("#hide-form");
const newBookBtn = document.querySelector("#new-book-button");
const formPopUp = document.querySelector("#form-popup")


//function to add book in the DOM
function renderBook(doc) {

  //create book div
  const bookDiv = document.createElement("div");
  bookDiv.setAttribute("data-id", doc.id)
  bookDiv.classList.add("col-10", "col-md-3", "book");


  //button to delete current book from library 
  const deleteButton = document.createElement("btn")
  deleteButton.classList.add("delete-book-button", "btn", "btn-secondary")
  deleteButton.innerHTML = "Delete Book"
  bookDiv.appendChild(deleteButton);

  
  //book's title
  const bookTitle = document.createElement("p");
  bookTitle.innerHTML = doc.data().title;
  bookTitle.classList.add("book-title");

  //book's author
  const bookAuthor = document.createElement("p");
  bookAuthor.innerHTML = doc.data().author;
  bookAuthor.classList.add("book-author");

  //book's genre
  const bookGenre = document.createElement("p");
  bookGenre.innerHTML = doc.data().genre;
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

  const book = new Book(form.title.value, form.author.value, form.genre.value)

  myLib.addBook(book)

  //clear inputs after submitting
  form.title.value = ""
  form.author.value = ""
  form.genre.value = ""


  //save changes to firestore
  db.collection("Books").add({
    title: book.title,
    author: book.author,
    genre: book.genre
  })
  formPopUp.style.display = "none"

  return false;

})

//FIRESTORE

myLib = new Library;

db.collection('Books').get().then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    myLib.addBook(doc)

  })
})