import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('header') header!: ElementRef;
  menuActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
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
}
