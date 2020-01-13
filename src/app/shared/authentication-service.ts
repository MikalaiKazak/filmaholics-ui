import {Injectable, NgZone} from '@angular/core';
import {auth} from 'firebase/app';
import {User} from './user';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {first} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    userData: any;

    constructor(
        public afStore: AngularFirestore,
        public ngFireAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone
    ) {
        this.ngFireAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    // Login in with email/password
    SignIn(email, password): Promise<firebase.auth.UserCredential> {
        return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    // Register user with email/password
    async RegisterUser(email, password): Promise<firebase.auth.UserCredential> {
        return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    // Email verification when new user register
    SendVerificationMail(): Promise<void> {
        return this.ngFireAuth.auth.currentUser.sendEmailVerification();
    }

    // Recover password
    PasswordRecover(passwordResetEmail): Promise<void> {
        return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
    }

    // Sign in with Gmail
    GoogleAuth(): Promise<auth.UserCredential> {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    // Auth providers
    AuthLogin(provider): Promise<auth.UserCredential> {
        return this.ngFireAuth.auth.signInWithPopup(provider);
    }

    // Store user in localStorage
    SetUserData(user): Promise<void> {
        const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        };
        return userRef.set(userData, {
            merge: true
        });
    }

    // Sign-out
    SignOut(): Promise<void> {
        return this.ngFireAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        });
    }

    getCurrentUser(): Promise<firebase.User> {
        return this.ngFireAuth.authState.pipe(first()).toPromise();
    }
}
