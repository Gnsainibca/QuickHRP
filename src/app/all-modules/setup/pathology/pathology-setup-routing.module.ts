import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordPathologySetupComponent } from './dashboard/dashboard-pathology-setup.component';

const routes: Routes = [
  { path: '', component: DashbaordPathologySetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PathologySetupRoutingModule { }
