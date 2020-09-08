
function User(email, pass, uuid) {
  this.email = email
  this.password = pass
  this.uuid = uuid
}



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

//toggle read status
Book.prototype.readBook = function(){
  console.log(this)
  this.read = (this.read == false) ? true : false;
}


