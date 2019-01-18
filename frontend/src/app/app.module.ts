import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DrinkListComponent} from './components/drink-list/drink-list.component';
import {DrinkFormComponent} from './components/drink-form/drink-form.component';
import {LoginComponent} from './components/login/login.component';
import {LocationFormComponent} from './components/location-form/location-form.component';
import {LocationsComponent} from './components/locations/locations.component';
import {JwtModule} from '@auth0/angular-jwt';
import {FormsModule} from '@angular/forms';
import {NavigationComponent} from './components/navigation/navigation.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import {RatingModule} from 'ngx-bootstrap/rating';
import {NgxSelectModule} from 'ngx-select-ex';
import {ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap';
import {UserListComponent} from './components/user-list/user-list.component';
import {MediainputComponent} from './components/mediainput/mediainput.component';
import {SafeUrlPipe} from './components/safe-pipe/safe-pipe.component';
import {SafePipeModule} from 'safe-pipe';
import {FileUploadModule} from 'ng2-file-upload';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {ErrorInterceptor} from './httpinterceptor/error.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
];

@NgModule({
  declarations: [
    AppComponent,
    MediainputComponent,
    DrinkListComponent,
    SafeUrlPipe,
    DrinkFormComponent,
    LoginComponent,
    LocationFormComponent,
    LocationsComponent,
    NavigationComponent,
    UserFormComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyB8d4_zfbw1kp0hYV18zvi60JSmqXw25Qw'}),
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    SafePipeModule,
    ReactiveFormsModule,
    RatingModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSelectModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    JwBootstrapSwitchNg2Module,
    NgbModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:4200']
        }
      }
    )
  ],
  providers: [DrinkFormComponent,
    LocationFormComponent,
    UserFormComponent,
    GoogleMapsAPIWrapper,
    httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
