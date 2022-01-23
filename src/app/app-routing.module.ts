import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './components/authentication/log-in/log-in.component';
import {NewRequestComponent} from './components/mechanic/new-request/new-request.component';
import {CurrentRequestsComponent} from './components/mechanic/current-requests/current-requests.component';
import {RequestsOverviewComponent} from './components/runner/requests-overview/requests-overview.component';
import {MyRunsComponent} from './components/runner/my-runs/my-runs.component';
import {EquipmentComponent} from './components/admin/equipment/equipment.component';
import {UsersComponent} from './components/admin/users/users.component';
import {AddEquipmentComponent} from './components/admin/add-equipment/add-equipment.component';
import {EquipmentDetailsComponent} from './components/admin/equipment-details/equipment-details.component';
import {UserDetailsComponent} from './components/admin/user-details/user-details.component';
import {AddUserComponent} from './components/admin/add-user/add-user.component';
import {HomePageComponent} from './components/mainpage/home-page/home-page.component';
import { ResetPasswordFormComponent } from './components/mainpage/reset-password-form/reset-password-form.component';

 export const routes: Routes = [
  {path: 'log-in', component: LogInComponent},
  {path: '', redirectTo: 'log-in', pathMatch: 'full'},
  { path: 'reset-password-form', component: ResetPasswordFormComponent },
  {path: 'home', component: HomePageComponent},

  /**
   * Mechanic routes
   */
  {path: 'new-request', component: NewRequestComponent},
  {path: 'current-requests', component: CurrentRequestsComponent},
  /**
   * Runner routes
   */
  {path: 'requests-overview', component: RequestsOverviewComponent},
  {path: 'my-runs', component: MyRunsComponent},

  /**
   * Admin routes
   */
  {path: 'equipment', component: EquipmentComponent},
  {path: 'equipment/add-equipment', component: AddEquipmentComponent},
  {path: 'equipment/viewEquipment', component: EquipmentDetailsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/add-user', component: AddUserComponent},
  {path: 'users/viewUser', component: UserDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
