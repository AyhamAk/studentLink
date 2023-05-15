import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {SnackBar} from "../../services/snackBar.service";

@Component({
  selector: 'app-main-hoome-page',
  templateUrl: './main-hoome-page.component.html',
  styleUrls: ['./main-hoome-page.component.css']
})
export class MainHoomePageComponent implements OnInit {

  constructor(private renderer: Renderer2
              , private el: ElementRef
              ,private authenticationService:AuthenticationService
              ,private snackBar:SnackBar) { }

  ngOnInit(): void {
  }

  openAddApartment(event: MouseEvent) {
    if(!this.getCurrentUser()){
      this.snackBar.openSnackBar('you have to logIn to list your apartment!','close')
      return;
    }
    event.preventDefault();
    const signInFormPopup = document.querySelector('.add-apartment-form-popup') as HTMLElement;
    signInFormPopup.style.display = 'flex';
    setTimeout(() => {
      signInFormPopup.classList.add('visible');
    }, 50);
    document.body.style.overflow = 'hidden';
  }
  getCurrentUser(){
    return this.authenticationService.getUser()?.email;
  }
}
