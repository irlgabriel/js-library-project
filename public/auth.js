const auth = firebase.auth()

googleSignInButton = document.querySelector("#google-sign-in");
signOutButton = document.querySelector("#sign-out");


googleSignInButton.addEventListener("click", googleoAuth)


function googleoAuth() {
  var googleAuth = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(googleAuth).then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;
    })
}



signOutButton.addEventListener("click", () => {
  auth.signOut();
  location.reload()
})

