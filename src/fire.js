/* installation: npm install firebase --save */
import firebase from 'firebase'

/* replace config by your project config in firebase */
var config = {
    apiKey: "AIzaSyDCN5ODp0N7HbpWAFasxhJcERrKL_dd0JY",
    authDomain: "btstmi.firebaseapp.com",
    databaseURL: "https://btstmi.firebaseio.com",
    projectId: "btstmi",
    storageBucket: "btstmi.appspot.com",
    messagingSenderId: "893159258575",
    appId: "1:893159258575:web:8231107a9bd86c31"
}

const fire = firebase.initializeApp(config)

export default fire