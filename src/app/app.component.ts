import {Component, OnInit} from '@angular/core';
import {Apartment} from "./models/apartment";
import {AuthenticationService} from "./services/authentication.service";
import {ApartmentService} from "./services/apartment-service";
import {Item} from "./models/item";
import {User} from "./models/user";
import {userService} from "./services/user.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apartments!: Apartment[];
  items!: Item[];
  users!:User[];
  profilePictureUrl!: string;
  constructor(private authenticationService: AuthenticationService,private apartmentService:ApartmentService,private userService:userService) {
  }

  async ngOnInit(): Promise<void> {
    this.apartments = await this.apartmentService.getApartments();
    this.items = await this.apartmentService.getItems();
    this.users=await this.userService.getUsers();
    this.profilePictureUrl='';
    this.getUserProfilePicture();
  }

  async onApartmentAdded(apartment:Apartment): Promise<void> {
    await this.apartmentService.addNewApartment(apartment.owner,apartment.price,apartment.location,apartment.description,apartment.imageDownloadUrl,apartment.userProfilePictureUrl,apartment.ownerId);
    this.apartments = await this.apartmentService.getApartments();
  }
  async onUserAdded(user:User):Promise<void>{
    await this.userService.addNewUser(user.name,user.email,user.password,user.profilePictureUrl);
    this.users=await this.userService.getUsers();
  }
  getUserProfilePicture(){
    this.users.forEach(user=>{
      if (user.email===this.authenticationService.getUser()?.email){
        this.profilePictureUrl=user.profilePictureUrl;
      }
    });
  }
}

