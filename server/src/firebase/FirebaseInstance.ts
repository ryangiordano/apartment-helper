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
        const fb = this.getFirebase().database().ref(`history`);
        return fb.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data)
        });


        // const fb = firebaseInstance.getFirebase().database().ref('feedback');
        // fb.on('value', (snapshot) => {
        //   const dataFromFB = snapshot.val();
        //   console.log(dataFromFB)
        //   const data = dataFromFB && Object.keys(dataFromFB).reduce((acc, key) => {
        //       const starValue = dataFromFB[key].graphics;
        //       acc[starValue]++;
        //       return acc;
        //     }, { 1:0, 2:0, 3:0, 4:0, 5:0})

        //   console.log(data)
        //   const dataToReturn = data ? Object.keys(data).map(key=>({x:key, y: data[key]})) : [];
        //   this.setState({ data: dataToReturn })
        // })




    }

    storeApartmentSnapshot(data) {
        const fb = this.getFirebase().database().ref('history');
        data.forEach(d => {
            const id = d.id;
            console.log(id);
            fb.child(id).push(d)
        })
        // fb.child(data.)
    }
}

export const firebaseInstance = new FirebaseInstance();