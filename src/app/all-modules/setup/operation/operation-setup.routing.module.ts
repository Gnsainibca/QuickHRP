import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordOperationSetupComponent } from './dashboard/dashboard-operation-setup.component';

const routes: Routes = [
  { path: '', component: DashbaordOperationSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationSetupRoutingModule { }
