import {Injectable, OnInit} from '@angular/core';
import {Apartment} from "../models/apartment";
import {initializeApp} from "firebase/app";
import {db, environment} from "../../environments/environment";
import {getAuth} from "@angular/fire/auth";
import {collection, doc, getDocs, getFirestore, setDoc} from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit {
  apartments: Apartment[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
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
        imageUrl: element['imageUrl']
      };
      this.apartments.push(apartment);
    })
    return this.apartments;
  }

  async setData() {
    const a = 'apartment_';
    let i = 6;
    const apartmentsCol = collection(db, 'apartments');
    for (i; i < 20; i++) {
      await setDoc(doc(db, "apartments", a + i.toString()), {
        price: 1950,
        owner: 'test',
        location: 'ret',
        description: 'please join',
        imageUrl:'/assets/'+i.toString()+'.png'
      });
    }
  }
}
