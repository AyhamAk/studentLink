import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apartment} from "../../models/apartment";
import {Item} from "../../models/item";
import {FirebaseService} from "../../services/firebase.service";
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getAuth } from 'firebase/auth';
import {DialogAnimationComponent} from "./dialog-animation/dialog-animation.component";
import {MatDialog} from "@angular/material/dialog";
import {ApartmentService} from "../../services/apartment-service";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../../environments/environment";

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {
  @Input() apartments!: Apartment[];
  @Input() items!: Item[];
  @Input() users!:User[];
  @Output() private loadingIndecator = new EventEmitter<boolean>();
  constructor(private firebaseService:FirebaseService,
              private authenticationService:AuthenticationService,
              public dialog: MatDialog,
              private apartmentService:ApartmentService,
              private cdr: ChangeDetectorRef) {}

  async ngOnInit() {

    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
  }
  getUserProfilePic(){
    this.users.forEach(user=>{
      if (user.email===this.authenticationService.getUser()?.email){
        return user.profilePictureUrl;
      }
      return ''
    });
  }
  openDialog(apartmentId:string, ownerId:string,apartmentLocation:string): void {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '380px',
      height:'220px',
      delayFocusTrap: true,
    });
    dialogRef.afterClosed().subscribe(async response => {
      if (response.data === 'shouldDelete') {
        this.loadingIndecator.emit(true);
        await this.apartmentService.deleteApartment(apartmentId);
        this.loadingIndecator.emit(false);
        const index = this.apartments.findIndex(apartment => apartment.location === apartmentLocation);
        // if an apartment was found (i.e., index is not -1), remove it
        if (index !== -1) {
          this.apartments.splice(index, 1);
        }
        this.cdr.detectChanges();
      }
    });
  }
  getCurrentUser() {
    return this.authenticationService.getUser()?.email;
  }
}
