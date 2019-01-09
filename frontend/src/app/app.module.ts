import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrinkListComponent } from './components/drink-list/drink-list.component';
import { DrinkFormComponent } from './components/drink-form/drink-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { CreateDrinkFormComponent } from './components/create-drink-form/create-drink-form.component';
import { CreateLocationFormComponent } from './components/create-location-form/create-location-form.component';
import { LocationsComponent } from './components/locations/locations.component';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    DrinkListComponent,
    DrinkFormComponent,
    UserProfileComponent,
    LoginComponent,
    LocationFormComponent,
    CreateDrinkFormComponent,
    CreateLocationFormComponent,
    LocationsComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:4200']
        }
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
