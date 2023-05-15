import { Component, Input, OnInit } from '@angular/core';
import {Apartment} from "../../models/apartment";
import {Item} from "../../models/item";
import {FirebaseService} from "../../services/firebase.service";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import firebase from "firebase/compat";
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {
  @Input() apartments!: Apartment[];
  @Input() items!: Item[];
  @Input() users!:User[];
  constructor(private firebaseService:FirebaseService,private authenticationService:AuthenticationService) {}

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
}
