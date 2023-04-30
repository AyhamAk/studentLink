import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from "../../../services/authentication.service";
import {ApartmentService} from "../../../services/apartment-service";
import {Apartment} from "../../../models/apartment";

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent implements OnInit {
  loadImageUrl: string | ArrayBuffer | null = null;

  imageUrl!: string ;
  location = '';
  price: number =0;
  email = '';
  name = '';
  lastName = '';
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  @Output() apartmentAdded = new EventEmitter<Apartment>();

  constructor(private _formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private ref: ChangeDetectorRef,
              private apartmentService: ApartmentService) {
  }

  ngOnInit(): void {
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.loadImageUrl = e.target?.result as string | ArrayBuffer | null; // Cast the result to the correct type
      };
      reader.readAsDataURL(file);
    }
  }
  closeAddApartmentForm() {
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
    const apartment:Apartment={
      owner: {firstName:this.name ,lastName: this.lastName},
      location:this.location,
      price:this.price,
      description:'nice place!',
      imageUrl:this.loadImageUrl
    }
    this.apartmentAdded.emit(apartment);
  }
}
