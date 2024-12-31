import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordSymptomsSetupComponent } from './dashboard/dashboard-symptoms-setup.component';

const routes: Routes = [
  { path: '', component: DashbaordSymptomsSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SymptomsSetupRoutingModule { }
