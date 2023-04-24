import {Injectable, OnInit} from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {collection, getDocs, getFirestore, query} from 'firebase/firestore';
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class FirestoreService implements OnInit{
  constructor() {
  }

  ngOnInit(): void {
  }
}
