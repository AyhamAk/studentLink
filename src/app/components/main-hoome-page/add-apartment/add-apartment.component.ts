import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../../../services/authentication.service";
import {ApartmentService} from "../../../services/apartment-service";
import {Apartment} from "../../../models/apartment";
import {FirebaseService} from "../../../services/firebase.service";
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {SnackBar} from "../../../services/snackBar.service";

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent implements OnInit {
  @Output() private addApartmentVisable = new EventEmitter<boolean>();
  @Output() private loadingIndecator = new EventEmitter<boolean>();
  @Output() private _apartmentAdded = new EventEmitter<Apartment>();

  get ownerId(): string {
    return this._ownerId;
  }

  set ownerId(value: string) {
    this._ownerId = value;
  }
  private imageUrl = '';

  get loadImageUrl(): ArrayBuffer {
    return <ArrayBuffer>this._loadImageUrl;
  }

  set loadImageUrl(value: string | ArrayBuffer | null) {
    this._loadImageUrl = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get email(): string | null | undefined {
    return this.getCurrentUser();
  }

  set email(value: string | null | undefined ) {
    this._email = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get firstFormGroup(): FormGroup {
    return this._firstFormGroup;
  }

  get secondFormGroup(): FormGroup {
    return this._secondFormGroup;
  }


  get isLinear(): boolean {
    return this._isLinear;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }


  _loadImageUrl: string | ArrayBuffer | null = null;
  private _description!: string;
  private _location = '';
  private _price: number = 0;
  private _email:string | null | undefined  = '';
  private _name = '';
  private _lastName = '';
  private _ownerId='';
  private _firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  private _secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  private _isLinear = false;
  isAddApartmentVisible: boolean=true;

  constructor(private _formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private ref: ChangeDetectorRef,
              private snackBar:SnackBar) {
  }

  ngOnInit(): void {
    this.cleanProperties();
  }

  async onImageSelected(event: any) {
    const storage = getStorage();
    this.imageUrl = 'images/' + this.name + this.lastName + '.jpg';
    const storageRef = ref(storage, 'images/' + this.name + this.lastName + '.jpg');
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

  closeAddApartmentForm() {
    this.addApartmentVisable.emit(false);
    const signInFormPopup = document.querySelector('.add-apartment-form-popup') as HTMLElement;
    signInFormPopup.classList.remove('visible');
    setTimeout(() => {
      signInFormPopup.style.display = 'none';
    }, 300);
    document.body.style.overflow = 'auto';
    this.ref.detectChanges();
  }

  getCurrentUser() {
    return this.authenticationService.getUser()?.email;
  }

  async addNewApartment() {
    await this.loadingIndecator.emit(true);
    // this.downloadImgFromStorage('images/'+this.name+this.lastName+'.jpg','testing1')
    const storage = getStorage();
    const image_download_url = await getDownloadURL(ref(storage, 'images/' + this.name + this.lastName + '.jpg'));
    const profile_pic_image_url = await getDownloadURL(ref(storage, 'images/profilepicutes/' + this.email + '.jpg'));
    const apartment: Apartment = {
      owner: {firstName: this.name, lastName: this.lastName,Email:this.email},
      location: this.location,
      price: this.price,
      description: this.description,
      imageDownloadUrl: image_download_url,
      userProfilePictureUrl:profile_pic_image_url,
      ownerId:this.ownerId
    }
    this.cleanProperties();
    this.closeAddApartmentForm();
    await this._apartmentAdded.emit(apartment);
    setTimeout(() => {
      // Code to be executed after the delay
      // Add your logic here
    }, 7000);
  }

  downloadImgFromStorage(url: string, elementId: string) {
    // replace the url with the name of the doc in the storage
    // getDownloadURL(ref(storage, url))
    //   .then((url) => {
    //     // `url` is the download URL for 'images/stars.jpg'
    //
    //     // This can be downloaded directly:
    //     const xhr = new XMLHttpRequest();
    //     xhr.responseType = 'blob';
    //     xhr.onload = (event) => {
    //       const blob = xhr.response;
    //     };
    //     xhr.open('GET', url);
    //     xhr.send();
    //
    //     // Or inserted into an <img> element
    //     const img = document.getElementById('testing1');
    //     img?.setAttribute('src', url);
    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //   });
  }

  private cleanProperties() {
    this.name = '';
    this.lastName = '';
    this.description = '';
    this.loadImageUrl = '';
    this.location = '';
    this.email = '';
    this.price=0;
  }

}
