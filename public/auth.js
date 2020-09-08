const auth = firebase.auth()

// User objects!

function User(email, pass, uuid) {
  this.email = email
  this.password = pass
  this.uuid = uuid
}



const signUp = document.querySelector("#sign-up")
const signIn = document.querySelector("#sign-in")
const signOut = document.querySelector("#sign-out")
const signUpForm = document.querySelector("#sign-up-form")

signOut.addEventListener("click", () => {
  auth.signOut().then(() => {
    location.reload()
  })
})

signIn.addEventListener("click", () => {
  auth.signInWithEmailAndPassword("mysumadyy@gmail.com", "4737e2c7").then(()=> {
    location.reload()
  })
})

signUp.addEventListener("click",(e) => {
  console.log(signUpForm.style.display)
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
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    signOut.style.display = "inline-block"
    signUp.style.display = "none"
    signIn.style.display = "none"

  } else {
    signUp.style.display = "inline-block"
    signIn.style.display = "inline-block"
    signOut.style.display = "none"
    console.log("User signed out!")
  }
});
