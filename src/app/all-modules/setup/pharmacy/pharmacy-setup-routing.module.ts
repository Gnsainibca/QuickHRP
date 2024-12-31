import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordPharmacySetupComponent } from './dashboard/dashboard-pharmacy-setup.component';

const routes: Routes = [
  { path: '', component: DashbaordPharmacySetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacySetupRoutingModule { }
