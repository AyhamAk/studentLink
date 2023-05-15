import {FirebaseApp} from "firebase/app";
import {
  createUserWithEmailAndPassword, getAuth,
  signInWithEmailAndPassword, onAuthStateChanged,
  signOut, sendPasswordResetEmail} from "firebase/auth";
import {Injectable} from "@angular/core";
import { app } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly authentication;

  constructor() {
    this.authentication = getAuth(app);
  }

  public async createNewAccount(email: string, password: string) {
    await createUserWithEmailAndPassword(this.authentication, email, password);
  }

  public async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.authentication, email, password);
  }

  public async logout() {
    await signOut(this.authentication);
  }

  public setAuthOnChangeState(callback: any) {
    onAuthStateChanged(this.authentication, callback);
  }

  public getUser() {
    return this.authentication.currentUser;
  }

  async resetPassword(email: string) {
    await sendPasswordResetEmail(this.authentication, email);
  }
}
