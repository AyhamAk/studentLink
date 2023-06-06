import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainHoomePageComponent } from './components/main-hoome-page/main-hoome-page.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import {environment} from "../environments/environment";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import { SignInComponent} from './components/header/sign-in/sign-in.component';
import {FormBuilder, FormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import { AddApartmentComponent } from './components/main-hoome-page/add-apartment/add-apartment.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import { DialogAnimationComponent } from './components/main-section/dialog-animation/dialog-animation.component';
import { LoaderComponent } from './components/main-hoome-page/loader/loader.component';
import { SearchingLoadedComponent } from './components/main-section/searching-loaded/searching-loaded.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConnectComponent } from './components/footer/connect/connect.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainHoomePageComponent,
    MainSectionComponent,
    SignInComponent,
    AddApartmentComponent,
    DialogAnimationComponent,
    LoaderComponent,
    SearchingLoadedComponent,
    FooterComponent,
    ConnectComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
