//firestore db
const db = firebase.firestore()

//constructor for building Book objects using
//firebase document reference

function Book(doc) {
  this.title = this.getTitle
  this.author = this.getAuthor
  this.genre = this.getGenre
  this.read = this.isRead
}

//"classic" constructor
function Book(title, author, genre, read) {
  this.title = title
  this.author = author
  this.genre = genre
  this.read = read
}

//"helper functions to get attributes from firebase"

Book.prototype.isRead = () => {
  this.data().read
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


//function to add book in the DOM
function renderBook(doc) {

  //create book div
  const bookDiv = document.createElement("div");
  bookDiv.setAttribute("data-id", doc.id)
  bookDiv.classList.add("col-10", "col-md-5", "col-lg-3", "book");


  //button to delete current book from library 
  const deleteButton = document.createElement("btn")
  deleteButton.classList.add("delete-book-button", "btn", "btn-secondary")
  deleteButton.innerHTML = "Delete Book"

  deleteButton.addEventListener("click", (e) => {

    if(confirm("Are you sure you want to delete this book? This action cannot be undone")) {
      parent = e.target.parentElement
      const id = parent.getAttribute("data-id")
      console.log(id);
      db.collection("Books").doc(id).delete();
      parent.remove();
    }
   
  })
  bookDiv.appendChild(deleteButton);

  
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
    const readBook = document.createElement("btn");
    readBook.classList.add("click-to-read", "btn", "btn-success", "d-none", "w-75", "mx-auto")
    readBook.innerHTML = "Click to Read"
    bookDiv.appendChild(readBook)

    bookDiv.addEventListener("mouseover", showEl)

    bookDiv.addEventListener("mouseleave", hideEl)

    function hideEl(e) {
      const show = e.target.querySelector(".click-to-read")
      show.classList.remove("d-block")
      show.classList.add("d-none")
    }

    function showEl(e) {
      const show = e.target.querySelector('.click-to-read')
      show.classList.remove("d-none")
      show.classList.add("d-block")
    }

    readBook.addEventListener("click", (e) => {
      e.target.parentElement.classList.add("read")
      //persist this change to the database
      const bookId = e.target.parentElement.getAttribute("data-id");
      
      db.collection("Books").doc(bookId).update({read: true})
      e.target.classList.add("d-none")

      e.target.parentElement.removeEventListener("mouseover", showEl)
      e.target.parentElement.removeEventListener("mouseleave", hideEl)
      e.target.classList.remove("d-block")
      e.target.classList.add("d-none")

      console.log(e.target)
      
    })


  }

  booksDiv.appendChild(bookDiv);
  main.appendChild(booksDiv);

  

  return bookDiv;
}


//"Add new book" event listener -> brings up book form creation
newBookBtn.addEventListener("click", () => {
  if(form.style.display == "block"){
    form.style.display = "none";
  }
  else {
    form.style.display = "block";
  }
})

//"Cancel" form button event listener -> hides the book form
hideFormBtn.addEventListener("click", () => {
  console.log(form)
  form.style.display = "none";
})

//Create book through form
form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const formValues = Array.from(form)
  .filter(ele => ele.value !== '')
  .map(ele => ({ name: ele.name, value: ele.value }));

  const book = new Book(form.title.value, form.author.value, form.genre.value, form.read.value)

  //save changes to firestore
  db.collection("Books").add({
    title: book.title,
    author: book.author,
    genre: book.genre,
  })

  //hide form after submiting
  form.style.display = "none"

  //clear inputs after submitting
  form.title.value = ""
  form.author.value = ""
  form.genre.value = ""



  return false;

})

//FIRESTORE


db.collection('Books').get().then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    new Book(doc)
    renderBook(doc)


  })
})
