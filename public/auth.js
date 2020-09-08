const auth = firebase.auth()

const signUp = document.querySelector("#sign-up")
const signIn = document.querySelector("#sign-in")
const signOut = document.querySelector("#sign-out")
const signUpForm = document.querySelector("#sign-up-form")
const signInForm = document.querySelector("#sign-in-form")
const userInfo = document.querySelector("#user-info")
const userEmail = document.querySelector("#user-email")

signOut.addEventListener("click", () => {
  auth.signOut().then(() => {
    location.reload()
  })
})

signIn.addEventListener("click", () => {
  if(signInForm.style.display == "none") {
    signInForm.style.display = "block"
  } else {
    signInForm.style.display = "none"
  }
})


signUp.addEventListener("click",(e) => {
  if(signUpForm.style.display == "none") {
    signUpForm.style.display = "block"
  } else {
    signUpForm.style.display = "none"
  }
})

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const email = signUpForm.email.value
  const password = signUpForm.password.value
  
  

  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred)
    const newUser = new User(email, password, cred.uuid)
    location.reload()
  })
  .catch((error) => {
    alert(error.message)
  })
})

signInForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const email = signInForm.email.value
  const password = signInForm.password.value
  
  auth.signInWithEmailAndPassword(email, password).then(() => {
    location.reload()
  })
  .catch((error) => {
    alert(error.message)
  })
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("User logged in!")
    // User is signed in.

    //DOM THINGS
    signOut.style.display = "inline-block"
    signUp.style.display = "none"
    signIn.style.display = "none"
    userInfo.style.visibility = "visible"

    const str = document.createElement("strong")
    str.innerHTML = user.email
    userEmail.appendChild(str)
    
    //FIREBASE COLLECTION

    collectionName = "Books" + user.uid

    db.collection(collectionName).get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
      const book = new Book(doc.data().title, doc.data().author, doc.data().genre, doc.data().read, doc.id);
      myLib.addBook(book)
      renderBook(doc)
      })
    })
    
   
    
  } else { 
    //User is not signed in / is logged out
    console.log("User signed out!")

    collectionName = "Books"
    console.log(collectionName)

    signUp.style.display = "inline-block"
    signIn.style.display = "inline-block"
    signOut.style.display = "none"
    userInfo.style.visibility = "hidden"
    
    db.collection(collectionName).get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
      const book = new Book(doc.data().title, doc.data().author, doc.data().genre, doc.data().read, doc.id);
      myLib.addBook(book)
      renderBook(doc)
      })
    })
    


  }
});

