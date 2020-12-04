import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponentComponent } from './home-page-component/home-page-component.component';
import { UserProfileComponentComponent } from './user-profile-component/user-profile-component.component';

const appRoutes: Routes = [
  {
    path:'home',
    component: HomePageComponentComponent
  },
  {
    path:'user',
    component: UserProfileComponentComponent
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule]
})
export class AppRountingModule { }
