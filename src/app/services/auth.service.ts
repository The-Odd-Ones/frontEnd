import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {}

  sendVerificationMail() {
    this.afAuth.auth.currentUser
      .sendEmailVerification()
      .then(result => {
        // sending email verification notification, when new user registers
        this.sendVerificationMail();
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  signUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.sendVerificationMail();
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result.user.emailVerified !== true) {
          this.sendVerificationMail();
          window.alert("Please validate your email address.check your indbox");
        } else {
          this.ngZone.run(() => {
            this.router.navigate(["/home"]);
          });
        }
      })
      .catch(error => {
        window.alert(error.message);
      });
  }
}
