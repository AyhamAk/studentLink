import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-hoome-page',
  templateUrl: './main-hoome-page.component.html',
  styleUrls: ['./main-hoome-page.component.css']
})
export class MainHoomePageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

//TODO swal / https://mdbootstrap.com/docs/angular/components/modal/
  openAddApartment(event: MouseEvent) {
    event.preventDefault();
    const signInFormPopup = document.querySelector('.add-apartment-form-popup') as HTMLElement;
    signInFormPopup.style.display = 'flex';
    setTimeout(() => {
      signInFormPopup.classList.add('visible');
    }, 50);
    document.body.style.overflow = 'hidden';
  }
}
