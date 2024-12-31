import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupVitalListComponent } from './dashboard/list/setup-vital-list.component';

const routes: Routes = [
  { path: '', component: SetupVitalListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VitalSetupRoutingModule { }
