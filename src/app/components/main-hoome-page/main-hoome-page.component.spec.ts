import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHoomePageComponent } from './main-hoome-page.component';

describe('MainHoomePageComponent', () => {
  let component: MainHoomePageComponent;
  let fixture: ComponentFixture<MainHoomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainHoomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHoomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
