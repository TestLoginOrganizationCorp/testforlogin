var GoogleAuth; // Google Auth object.
function initClient() {
  gapi.client.init({
    'apiKey': 'AIzaSyBG8dPTg52rH0rTtwIR6a-Bl1DWiELwY1M',
    'clientId': '124313717233-07rr4ogob6emhbpfl4jqu6u1u6mobbu2.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);
  });
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function login() {
  GoogleAuth.signIn();
}


function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    isAuthorized = true;
    if (currentApiRequest) {
      sendAuthorizedApiRequest(currentApiRequest);
    }
  } else {
    isAuthorized = false;
  }
}


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}


initClient();