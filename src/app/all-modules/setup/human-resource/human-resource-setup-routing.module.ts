import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordHumanResourceSetupComponent } from './dashboard/dashboard-human-resource-setup.component';

const routes: Routes = [
  { path: '', component: DashbaordHumanResourceSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourceSetupRoutingModule { }
