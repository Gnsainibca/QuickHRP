import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordFindingsSetupComponent } from './dashboard/dashboard-findings-setup.component';

const routes: Routes = [
  { path: '', component: DashbaordFindingsSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindingsSetupRoutingModule { }
