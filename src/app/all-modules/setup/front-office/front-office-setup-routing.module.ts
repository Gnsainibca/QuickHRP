import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordFrontOfficeSetupComponent } from './dashboard/dashboard-front-office-setup.component';

const routes: Routes = [
  { path: '', component: DashbaordFrontOfficeSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeSetupRoutingModule { }
