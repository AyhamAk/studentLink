import {Injectable, OnInit} from '@angular/core';
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../../environments/environment";
import {Apartment} from "../models/apartment";
import {Item} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class ApartmentService implements OnInit {
  apartments: Apartment[] = [];
  items: Item[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  async getApartments() {
    this.apartments=[];
    // get apartments data
    const apartmentsCol = collection(db, 'apartments');
    const information = await getDocs(apartmentsCol);
    const apartmentList = information.docs
      .map(doc => doc.data());
    apartmentList.map(element => {
      let apartment: Apartment = {
        price: element['price'],
        owner: element['owner'],
        location: element['location'],
        description: element['description'],
        imageDownloadUrl: element['imageDownloadUrl'],
        userProfilePictureUrl:element['userProfilePictureUrl']
      };
      this.apartments.push(apartment);
    })
    return this.apartments;
  }

  async getItems() {
    // get apartments data
    const itemsCol = collection(db, 'items');
    const information = await getDocs(itemsCol);
    const itemsList = information.docs
      .map(doc => doc.data());
    itemsList.map(element => {
      let item: Item = {
        price: element['price'],
        owner: element['owner'],
        location: element['location'],
        description: element['description'],
        imageUrl: element['imageUrl'],
        item_title: element['item_title']
      };
      this.items.push(item);
    })
    return this.items;
  }

  async setData() {
    const a = 'apartment_';
    let i = 1;
    for (i; i < 20; i++) {
      await setDoc(doc(db, "home_items", a + i.toString()), {
        price: 35 + i,
        owner: 'test',
        location: 'ret',
        description: 'please join',
        imageUrl: '/assets/' + i.toString() + '.png'
      });
    }
  }

  async addNewApartment(owner: {
    firstName: string;
    lastName: string
  }, price: number, location: string, description: string, image_download_url: string, userProfilePictureUrl: string | undefined) {
    const apartmentName = owner.firstName +' '+ owner.lastName +' ' + 'apartment';
    await setDoc(doc(db, "apartments", apartmentName), {
      price: price,
      owner:owner,
      location: location,
      description: description,
      imageDownloadUrl: image_download_url,
      userProfilePictureUrl:userProfilePictureUrl
    });
  }
}
