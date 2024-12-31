import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAppointmentSetupComponent } from './dashboard/dashboard-appointment-setup.component';

const routes: Routes = [
  { path: '', component: DashboardAppointmentSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentSetupRoutingModule { }
