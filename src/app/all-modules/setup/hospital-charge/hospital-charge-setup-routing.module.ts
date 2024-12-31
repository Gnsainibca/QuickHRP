import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordHospitalChargeSetupComponent } from './dashboard/dashboard-hospital-charge-setup.component';

const routes: Routes = [
  { path: '', component: DashbaordHospitalChargeSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalChargeSetupRoutingModule { }
