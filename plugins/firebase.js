import * as firebase from 'firebase'

if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyDJiS6X4JJK7qlbIMZAFkbSsF62AiAXyZg",
      authDomain: "osteoplastika.firebaseapp.com",
      databaseURL: "https://osteoplastika.firebaseio.com",
      projectId: "osteoplastika",
      storageBucket: "osteoplastika.appspot.com",
      messagingSenderId: "424319304798",
      appId: "1:424319304798:web:0ddc6e29dfe53d8c"
    })
}

export { firebase }
