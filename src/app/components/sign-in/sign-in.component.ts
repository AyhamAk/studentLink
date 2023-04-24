import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  currentUser!:User;
  set isLogIn(value: boolean) {
    this._isLogIn = value;
  }

  set loginEmail(value: string) {
    this._loginEmail = value;
  }

  set loginPassword(value: string) {
    this._loginPassword = value;
  }

  set signupName(value: string) {
    this._signupName = value;
  }

  set signupEmail(value: string) {
    this._signupEmail = value;
  }

  set signupPassword(value: string) {
    this._signupPassword = value;
  }

  set signupConfirmPassword(value: string) {
    this._signupConfirmPassword = value;
  }
  get isLogIn(): boolean {
    return this._isLogIn;
  }

  get loginEmail(): string {
    return this._loginEmail;
  }

  get loginPassword(): string {
    return this._loginPassword;
  }

  get signupName(): string {
    return this._signupName;
  }

  get signupEmail(): string {
    return this._signupEmail;
  }

  get signupPassword(): string {
    return this._signupPassword;
  }

  get signupConfirmPassword(): string {
    return this._signupConfirmPassword;
  }
  private _isLogIn: boolean = true;
  private _loginEmail:string='';
  private _loginPassword:string='';
  private _signupName: string='';
  private _signupEmail: string='';
  private _signupPassword: string='';
  private _signupConfirmPassword: string='';
  constructor(private authenticationService: AuthenticationService) {
    this.currentUser={
      email:'',
      name:'',
      password:''
    }
  }

  ngOnInit(): void {
  }

  closeSignInForm(event: MouseEvent) {
    event.preventDefault();
    const signInFormPopup = document.querySelector('.sign-in-form-popup') as HTMLElement;
    signInFormPopup.classList.remove('visible');
    setTimeout(() => {
      signInFormPopup.style.display = 'none';
    }, 300);
    document.body.style.overflow = 'auto';
  }

  changeState() {
    this._isLogIn = !this._isLogIn;
  }

  setAccount() {
    this.authenticationService.createNewAccount(this._signupEmail,this._signupPassword);
  }
}