import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from "./services/firebase.service";
import {Apartment} from "./models/apartment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apartments!: Apartment[];


  constructor(private firebaseService:FirebaseService) {
  }

  async ngOnInit(): Promise<void> {
    this.apartments = await this.firebaseService.getData();
  }
}

