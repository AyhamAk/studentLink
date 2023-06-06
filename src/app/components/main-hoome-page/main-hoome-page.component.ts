import {Component, OnInit, ElementRef, Renderer2, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {SnackBar} from "../../services/snackBar.service";
import {Apartment} from "../../models/apartment";
import {DialogAnimationComponent} from "../main-section/dialog-animation/dialog-animation.component";
import {MatDialog} from "@angular/material/dialog";
import {AddApartmentComponent} from "./add-apartment/add-apartment.component";

@Component({
  selector: 'app-main-hoome-page',
  templateUrl: './main-hoome-page.component.html',
  styleUrls: ['./main-hoome-page.component.css']
})
export class MainHoomePageComponent implements OnInit {
  @Output() private addApartmentVisable = new EventEmitter<boolean>();

  constructor(private renderer: Renderer2
    , private el: ElementRef
    , private authenticationService: AuthenticationService
    , private snackBar: SnackBar,
              private dialog: MatDialog
  ) {
  }

  ngOnInit()
    :
    void {
  }

  openAddApartment(event:MouseEvent) {
    if (!this.getCurrentUser()) {
      this.snackBar.openSnackBar('you have to logIn to list your apartment!', 'close')
      return;
    }
    this.addApartmentVisable.emit(true);
    event.preventDefault();
    const signInFormPopup = document.querySelector('.add-apartment-form-popup') as HTMLElement;
    signInFormPopup.style.display = 'flex';
    setTimeout(() => {
      signInFormPopup.classList.add('visible');
    }, 50);
    document.body.style.overflow = 'hidden';
  }


  getCurrentUser() {
    return this.authenticationService.getUser()?.email;
  }
  scrollToSection() {
    const section = document.getElementById('mainSectionontainer');
    section?.scrollIntoView({ behavior: 'smooth' });
  }
}
