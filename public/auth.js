const auth = firebase.auth()
googleSignInButton = document.querySelector("#google-sign-in");
signOutButton = document.querySelector("#sign-out");

googleSignInButton.addEventListener("click", () => {
    var googleAuth = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(googleAuth).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user)

  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

  })
});


signOutButton.addEventListener("click", () => {
  auth.signOut();
  location.reload()
})

