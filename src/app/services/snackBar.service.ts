import {Injectable, OnInit} from '@angular/core';
import {Apartment} from "../models/apartment";
import {initializeApp} from "firebase/app";
import {db, environment} from "../../environments/environment";
import {getAuth} from "@angular/fire/auth";
import {collection, doc, getDocs, getFirestore, setDoc} from "firebase/firestore";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBar implements OnInit {

  constructor(private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'], // Add the custom-snackbar class
    });
  }
}
