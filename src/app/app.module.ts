import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/mainpage/header/header.component';
import {NavbarComponent} from './components/mainpage/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {LogInComponent} from './components/authentication/log-in/log-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewRequestComponent} from './components/mechanic/new-request/new-request.component';
import {CurrentRequestsComponent} from './components/mechanic/current-requests/current-requests.component';
import { RequestsOverviewComponent } from './components/runner/requests-overview/requests-overview.component';
import { MyRunsComponent } from './components/runner/my-runs/my-runs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule, MatDialogModule, MatInputModule, MatNativeDateModule, MatIconModule} from '@angular/material';
import { DeliveryConfirmationComponent } from './components/runner/delivery-confirmation/delivery-confirmation.component';
import {DatePipe} from '@angular/common';
import { EquipmentPickComponent } from './components/runner/equipment-pick/equipment-pick.component';
import { EquipmentComponent } from './components/admin/equipment/equipment.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AddEquipmentComponent } from './components/admin/add-equipment/add-equipment.component';
import { EquipmentDetailsComponent } from './components/admin/equipment-details/equipment-details.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ErrorInterceptorService} from './http-interceptors/error-interceptor.service';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import {AuthInterceptorService} from './http-interceptors/auth-interceptor.service';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment';
import {ToastrModule} from 'ngx-toastr';
import { HomePageComponent } from './components/mainpage/home-page/home-page.component';
import { ResetPasswordFormComponent } from './components/mainpage/reset-password-form/reset-password-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LogInComponent,
    NewRequestComponent,
    CurrentRequestsComponent,
    RequestsOverviewComponent,
    MyRunsComponent,
    DeliveryConfirmationComponent,
    EquipmentPickComponent,
    EquipmentComponent,
    UsersComponent,
    AddEquipmentComponent,
    EquipmentDetailsComponent,
    UserDetailsComponent,
    AddUserComponent,
    HomePageComponent,
    ResetPasswordFormComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    }),
    MatButtonToggleModule,
    MatIconModule
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DeliveryConfirmationComponent, EquipmentPickComponent]
})
export class AppModule {}
