import {Injectable, OnInit} from '@angular/core';
import {Apartment} from "../models/apartment";
import { Item } from '../models/item';
import {FirebaseStorage, getDownloadURL, getStorage, ref, StorageReference, uploadBytes, uploadString} from "firebase/storage";
import {AngularFireStorageReference} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit {
  apartments: Apartment[] = [];
  items : Item[]=[];
  storage! :FirebaseStorage;
  mountainsRef!:StorageReference ;
  storageRef!: StorageReference;

  constructor() {

  }

  ngOnInit(): void {
    this.storage=getStorage();
    this.storageRef = ref(this.storage, 'images/apartment.jpg');
  }
  downloadImgFromStorage(url:string,elementId:string){
    const storage = getStorage();
    // replace the url with the name of the doc in the storage
    getDownloadURL(ref(storage, url))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element
        const img = document.getElementById('testing');
        img?.setAttribute('src', url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  uploadDataFromStorage(loadImageUrl: string){
   /* const storage = getStorage();
    const storageRef = ref(storage, 'some-child');

// 'file' comes from the Blob or File API
    uploadBytes(storageRef, loadImageUrl).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });*/
    const storage = getStorage();
    const mountainsRef = ref(storage, 'mountains.jpg');
    const message = 'This is my message.';
    uploadString(mountainsRef, message).then((snapshot) => {
      console.log('Uploaded a raw string!');
    });
  }
}
