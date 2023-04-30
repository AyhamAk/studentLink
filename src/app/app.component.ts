import {Component, OnInit} from '@angular/core';
import {Apartment} from "./models/apartment";
import {AuthenticationService} from "./services/authentication.service";
import {ApartmentService} from "./services/apartment-service";
import {Item} from "./models/item";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apartments!: Apartment[];
  items!: Item[];

  constructor(private apartmentService:ApartmentService,private authenticationService: AuthenticationService) {
  }

  async ngOnInit(): Promise<void> {
    this.apartments = await this.apartmentService.getApartments();
    this.items = await this.apartmentService.getItems();
  }

  async refreshApartmentList(): Promise<void> {
    this.apartments = await this.apartmentService.getApartments();
    this.items = await this.apartmentService.getItems();
  }

  async onApartmentAdded(apartment:Apartment): Promise<void> {
    await this.apartmentService.addNewApartment(apartment.owner.firstName,apartment.owner.lastName,apartment.price,apartment.description,apartment.imageUrl);
    this.apartments = await this.apartmentService.getApartments();
  }
}

