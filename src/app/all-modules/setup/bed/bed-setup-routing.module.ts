import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordHospitalBedSetupComponent } from './dashboard/dashboard-hospital-bed-setup.component';

const routes: Routes = [
  { path: '', component: DashbaordHospitalBedSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BedSetupRoutingModule { }
