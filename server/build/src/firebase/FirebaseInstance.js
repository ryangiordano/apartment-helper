"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
require("firebase/auth");
require("firebase/database");
const dotenv = require("dotenv");
dotenv.config();
const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};
class FirebaseInstance {
    constructor() {
        this.doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
        this.doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
        this.doSignOut = () => this.auth.signOut();
        this.doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
        this.doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
        this.getFirebase = () => this.app;
        this.app = app_1.default.initializeApp(config);
    }
    getDataById(id) {
        const fb = this.getFirebase().database().ref(`history`);
        return fb.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });
    }
    storeApartmentSnapshot(data) {
        const fb = this.getFirebase().database().ref('history');
        data.forEach(d => {
            const id = d.id;
            console.log(id);
        });
    }
}
exports.firebaseInstance = new FirebaseInstance();
//# sourceMappingURL=FirebaseInstance.js.map