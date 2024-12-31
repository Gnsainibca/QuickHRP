import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadiologyListComponent } from './dashbaord/list/radiology-list.component';
import { RadiologyTestListComponent } from './Test/list/radiology-test-list.component';

const routes: Routes = [
  { path: '', component: RadiologyListComponent },
  { path: 'test', component: RadiologyTestListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadiologyRoutingModule { }
