import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponentComponent } from './home-page-component/home-page-component.component';
import { UserProfileComponentComponent } from './user-profile-component/user-profile-component.component';
import { AppRountingModule } from './app-rounting.module';
import { Ng5SliderModule } from 'ng5-slider';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RestService } from './service/rest.service';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponentComponent,
    UserProfileComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRountingModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
