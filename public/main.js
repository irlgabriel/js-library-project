//firestore db
const db = firebase.firestore()

function Library() {
  this.library = [];
}

Library.prototype.addBook = function(book) {
  this.library.push(book)
}

function Book(title, author, genre, read, id) {
  this.title = title
  this.author = author
  this.genre = genre
  this.read = read
  this.id = id
}

const myLib = new Library

// function to toggle read status
Book.prototype.readBook = function(){
  console.log(this)
  this.read = (this.read == false) ? true : false;
}

// function to check if user is logged in!
function userLoggedIn() {
  return auth.currentUser
}

const booksDiv = document.querySelector("#books-container");
const main = document.querySelector("#main");
const form = document.querySelector('form');
const hideFormBtn = document.querySelector("#hide-form");
const newBookBtn = document.querySelector("#new-book-button");
const noticeDiv = document.querySelector("#notice-div")
const notice = document.querySelector("#notice")


//function to add book in the DOM
function renderBook(doc) {

  //create book div
  const bookDiv = document.createElement("div");
  bookDiv.setAttribute("data-id", doc.id)
  bookDiv.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "col-xl-2", "book");

  //button to delete current book from library 
  const deleteButton = document.createElement("btn")
  deleteButton.classList.add("delete-book-button", "btn", "btn-outline-dark")
  deleteButton.innerHTML = "Delete Book"

  deleteButton.addEventListener("click", (e) => {
    if (!userLoggedIn()) {
      e.stopPropagation() //dont trigger bookDiv's event as well
      alert("You need to be logged in for this action!")
      return false
    }
    if(confirm("Are you sure you want to delete this book? This action cannot be undone")) {
      parent = e.target.parentElement
      const id = parent.getAttribute("data-id")
      db.collection("Books").doc(id).delete();
      parent.remove();
      e.stopPropagation()
    }
   
  })
  bookDiv.appendChild(deleteButton);

  
  //BOOK'S INFO

  //book's title
  const bookTitle = document.createElement("p");
  bookTitle.innerHTML = doc.data().title;
  bookTitle.classList.add("book-title");
  bookDiv.appendChild(bookTitle);

  //book's author
  const bookAuthor = document.createElement("p");
  bookAuthor.innerHTML = doc.data().author;
  bookAuthor.classList.add("book-author");
  bookDiv.appendChild(bookAuthor);

  //book's genre
  const bookGenre = document.createElement("p");
  bookGenre.innerHTML = doc.data().genre;
  bookGenre.classList.add("book-genre");
  bookDiv.appendChild(bookGenre);


  //read book
  if (doc.data().read == true) {
    bookDiv.classList.add("read");
  }
  else {
    bookDiv.classList.add("unread")
  }

  booksDiv.appendChild(bookDiv);
  main.appendChild(booksDiv);

  //Toggle between read/unread status in firebase db
  bookDiv.addEventListener("click", (e) => {
    if (!userLoggedIn()) {
      alert("You need to be logged in for this action!")
      return false
    }
    const bookId = e.target.getAttribute("data-id");
    const book = myLib.library.find(el => el.id == bookId)

    //console.log(book)

    if(book.read == true) {
      book.read = false;
      db.collection("Books").doc(bookId).update({     
        read: false
      })
      e.target.classList.remove("read")
      e.target.classList.add("unread")
    } else {
      book.read = true;
      db.collection("Books").doc(bookId).update({
        read: true
      })
      e.target.classList.remove("unread")
      e.target.classList.add("read")
    }


    /* debug
    console.log(book)
    db.collection("Books").doc(bookId).get().then((docRef) => {
      console.log(docRef.data())
      console.log(docRef.id)
    })
    */

})

  return bookDiv;
}

//"Add new book" event listener -> brings up book form creation
newBookBtn.addEventListener("click", () => {
  if (!userLoggedIn()) {
    alert("You need to be logged in for this action!")
    return false
  }
  if(form.style.display == "block"){
    form.style.display = "none";
  }
  else {
    form.style.display = "block";
  }
})

//"Cancel" form button event listener -> hides the book form
hideFormBtn.addEventListener("click", () => {
  form.style.display = "none";
})

//Create book through form
form.addEventListener("submit", (e) => {
  e.preventDefault(); 
  
  const book = new Book(form.title.value, form.author.value, form.genre.value, form.read.checked)

  //hide form after submiting
  form.style.display = "none"

  //clear inputs after submitting
  form.title.value = ""
  form.author.value = ""
  form.genre.value = ""
  form.read.checked = false;

  //save changes to firestore
  db.collection("Books").add({
    title: book.title,
    author: book.author,
    genre: book.genre,
    read: book.read
  })
  .then((docRef) => {
    db.collection('Books').doc(docRef.id).get()
    .then((docRef) => {
      //renderBook(docRef)
      //console.log(docRef.data())
      //const book = myLib.library.find(el => el.id == docRef.id)
      //console.log(book)
      location.reload()
    })
  })
  
 


  return false;

})


//retrieve books from firestore databaste
db.collection('Books').get().then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    const book = new Book(doc.data().title, doc.data().author, doc.data().genre, doc.data().read, doc.id)
    myLib.addBook(book)
    renderBook(doc)
  })
})

