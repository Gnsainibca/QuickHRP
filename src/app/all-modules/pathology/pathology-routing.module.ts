import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathologyListComponent } from './dashbaord/list/pathology-list.component';
import { PathologyTestListComponent } from './Test/list/pathology-test-list.component';

const routes: Routes = [
  { path: '', component: PathologyListComponent },
  { path: 'test', component: PathologyTestListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PathologyRoutingModule { }
