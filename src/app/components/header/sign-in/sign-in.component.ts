import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../models/user";
import {SnackBar} from 'src/app/services/snackBar.service';
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {userService} from "../../../services/user.service";
import {Apartment} from "../../../models/apartment";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @Output() private userAdded = new EventEmitter<User>();

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }
  currentUser!: User;
  private validEmail!: boolean;
  private imageUrl = '';
  _loadImageUrl: string | ArrayBuffer | null = null;

  set isLogIn(value: boolean) {
    this._isLogIn = value;
  }

  get loadImageUrl(): ArrayBuffer {
    return <ArrayBuffer>this._loadImageUrl;
  }

  set loadImageUrl(value: string | ArrayBuffer | null) {
    this._loadImageUrl = value;
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
  private _loginEmail: string = '';
  private _loginPassword: string = '';
  private _signupName: string = '';
  private _signupEmail: string = '';
  private _signupPassword: string = '';
  private _signupConfirmPassword: string = '';
  private _firstName='';
  private _lastName='';
  constructor(private authenticationService: AuthenticationService, private snackBar: SnackBar,private userService:userService) {
    this.currentUser = {
      email: '',
      name: '',
      password: '',
      profilePictureUrl:''
    }
    this.validEmail = false;
  }

  ngOnInit(): void {
    this.validEmail = true;
  }

  closeSignInForm() {
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
    this.authenticationService
      .createNewAccount(this._signupEmail, this._signupPassword)
      .then(async () => {
        // This will only be executed if the account is created successfully.
        this.snackBar.openSnackBar('Congrats! You created an account. NOW you can sign in', 'Close');
        await this.addNewUser();
      })
      .catch(() => {
        // This will only be executed if there's an error (e.g., email already exists).
        this.snackBar.openSnackBar('This email is already in use. Please try another one', 'Close');
      });
  }

  logIn() {
    this.authenticationService
      .login(this.loginEmail, this.loginPassword)
      .then(() => {
        // This will only be executed if the account is created successfully.
        this.snackBar.openSnackBar('hey there' + this.loginEmail, 'Close');
        this.currentUser.email = this.
        authenticationService.getUser()?.email;
        this.closeSignInForm();
      })
      .catch(() => {
        // This will only be executed if there's an error (e.g., email already exists).
        this.snackBar.openSnackBar('Sign in unsuccessful. Please check your email and password, and try again. If you\'ve forgotten your password, consider using the \'Forgot Password\' option to reset it', 'Close');
      });
  }

  async onImageSelected(event: any) {
    const storage = getStorage();
    this.imageUrl = '/images/profilepicutes/' + this.signupEmail + '.jpg';
    const storageRef = ref(storage, 'images/profilepicutes/' + this.signupEmail + '.jpg');
    const file = event.target.files[0];
    if (file) {
      // Create file metadata including the content type
      const metadata = {
        contentType: file.type,
      };

      try {
        // Upload the file and metadata
        await uploadBytes(storageRef, file, metadata);
        console.log('Image uploaded successfully to Firebase Storage.');

        // Display the uploaded image
        const reader = new FileReader();
        reader.onload = (e) => {
          this.loadImageUrl = e.target?.result as string | ArrayBuffer | null;
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }
  async addNewUser() {
    const storage = getStorage();
    const image_download_url = await getDownloadURL(ref(storage, '/images/profilepicutes/' + this.signupEmail + '.jpg'));
    const user: User = {
      email:this.signupEmail,
      name:this.firstName,
      password:this.signupPassword,
      profilePictureUrl:image_download_url
    }
    this.userAdded.emit(user);
  }
}
