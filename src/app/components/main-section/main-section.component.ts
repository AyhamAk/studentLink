import { Component, Input, OnInit } from '@angular/core';
import {Apartment} from "../../models/apartment";
import {Item} from "../../models/item";

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {
  @Input() apartments!: Apartment[];
  @Input() items!: Item[];

  constructor() {}

  async ngOnInit() {
  }
}
