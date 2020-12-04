import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponentComponent } from './home-page-component/home-page-component.component';
import { UserProfileComponentComponent } from './user-profile-component/user-profile-component.component';
import { AppRountingModule } from './app-rounting.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponentComponent,
    UserProfileComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRountingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
