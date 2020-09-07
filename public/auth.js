const auth = firebase.auth()

auth.signInWithEmailAndPassword("mysumadyy@gmail.com", "4737e2c7").then((cred) => {
  console.log(cred)
})