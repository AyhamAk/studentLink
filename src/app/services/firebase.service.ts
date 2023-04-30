import {Injectable, OnInit} from '@angular/core';
import {Apartment} from "../models/apartment";
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit {
  apartments: Apartment[] = [];
  items : Item[]=[];
  constructor() {

  }

  ngOnInit(): void {

  }
}
