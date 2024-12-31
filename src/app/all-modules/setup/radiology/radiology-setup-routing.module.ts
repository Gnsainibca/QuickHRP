import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordRadiologySetupComponent } from './dashboard/dashboard-radiology-setup.component';

const routes: Routes = [
  { path: '', component: DashbaordRadiologySetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadiologySetupRoutingModule { }
