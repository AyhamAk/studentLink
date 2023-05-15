import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import { getAuth } from 'firebase/auth';
import {AuthenticationService} from "../../services/authentication.service";
import {SnackBar} from "../../services/snackBar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() profilePictureUrl!:string;
  @ViewChild('header') header!: ElementRef;
  menuActive: boolean = false;
  activeUserEmail!:string;
  constructor(private authenticationService: AuthenticationService,private snackBar:SnackBar) { }

  ngOnInit(): void {
    this.getUserProfilePicture();
  }
  dropdownOpen = false;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > this.header.nativeElement.offsetHeight) {
      this.header.nativeElement.classList.add('sticky');
    } else {
      this.header.nativeElement.classList.remove('sticky');
    }
  }
  openSignInForm(event: MouseEvent) {
    event.preventDefault();
    const signInFormPopup = document.querySelector('.sign-in-form-popup') as HTMLElement;
    signInFormPopup.style.display = 'flex';
    setTimeout(() => {
      signInFormPopup.classList.add('visible');
    }, 50);
    document.body.style.overflow = 'hidden';
  }
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
  getCurrentUser(){
    return this.authenticationService.getUser()?.email;
  }
  signOut(){
    this.authenticationService.logout();
    this.snackBar.openSnackBar('Goodbye! You have successfully signed out. See you soon!','close');
  }
  getUserProfilePicture(){
    console.log(this.getCurrentUser());
  }
}
