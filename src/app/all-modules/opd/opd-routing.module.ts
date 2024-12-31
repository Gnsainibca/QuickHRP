import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OPDListComponent } from './dashboard/list/opd-list.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';

const routes: Routes = [
  { path: '', component: OPDListComponent },
  { path: 'patient/visit-details/:id/:tab', component: VisitDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdRoutingModule { }
