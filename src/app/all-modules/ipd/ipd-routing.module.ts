import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IPDListComponent } from './dashboard/list/ipd-list.component';
import { IPDDetailsComponent } from './ipd-details/ipd-details.component';
import { IPDDischargedPatientListComponent } from './dashboard/discharged-patient/ipd-discharged-patient-list.component';

const routes: Routes = [
  { path: '', component: IPDListComponent },
  { path: 'bed/:bedId', component: IPDListComponent },
  { path: 'discharged-patient', component: IPDDischargedPatientListComponent },
  { path: 'patient/:id/:tab', component: IPDDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpdRoutingModule { }
