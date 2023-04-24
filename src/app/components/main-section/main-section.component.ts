import { Component, Input, OnInit } from '@angular/core';
import { ApartmentService } from 'src/app/services/apartment-service';
import {Apartment} from "../../models/apartment";

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {
  @Input() apartments!: Apartment[];
  carouselConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  constructor(private apartmentService: ApartmentService) {}

  ngOnInit() {
/*    this.apartmentService.getApartments().subscribe((data) => {
      this.apartments = data;
    });*/
  }
}
