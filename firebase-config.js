const firebaseConfig = {
    apiKey: "AIzaSyDGiZREuXUhfTmWqGLhLGEFEZmoPnoRVPk",
    authDomain: "ui-design-programming.firebaseapp.com",
    projectId: "ui-design-programming",
    storageBucket: "ui-design-programming.appspot.com",
    messagingSenderId: "815344675056",
    appId: "1:815344675056:web:903c11bc12fd55823efa35",
    measurementId: "G-ZZBZTBKPHN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  var db = firebase.firestore();

  console.log("Firebase configuration loaded.");