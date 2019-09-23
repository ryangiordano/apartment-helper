import app from 'firebase/app' // eslint-disable-line
import 'firebase/auth'
import 'firebase/database'
import * as dotenv from 'dotenv'
dotenv.config();

export interface Feedback {
    email: string,
    feedback: string,
    gameplay: string,
    graphics: string,
    sound: string,
    story: string
}


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
    private auth;
    private app;
    constructor() {
        this.app = app.initializeApp(config)
    }

    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

    doSignOut = () => this.auth.signOut()

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    getFirebase = () => this.app

    getDataById(id): Promise<any> {
        //TODO: Implement correctly
        const fb = this.getFirebase().database().ref(`history`);
        return fb.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data)
        });
    }

    checkIfUrlExists(url): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const allUrls = await this.getAllUrls();
            const exists = !!Object.values(allUrls).find(v => v === url);
            resolve(exists)
        });
    }

    getAllUrls(): Promise<any> {
        return new Promise((resolve, reject) => {
            const fb = this.getFirebase().database().ref(`urls`);
            fb.once('value', (snapshot) => {
                resolve(snapshot.val())
            });
        });
    }

    addUrl(url): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const fb = this.getFirebase().database().ref(`urls`);
            const exists = await this.checkIfUrlExists(url);
            if (exists) {
                return reject("Error: URL already exists.");
            }
            resolve(fb.push(url));
        });
    }

    storeApartmentSnapshot(data) {
        const fb = this.getFirebase().database().ref('history');
        data.forEach(d => {
            const id = d.id;
            fb.child(id).push(d)
            console.log(`Storing data for apartment with id: ${id}`)
        })
    }

    add
}

export const firebaseInstance = new FirebaseInstance();