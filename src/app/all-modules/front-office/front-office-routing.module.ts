import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorListComponent } from './visitor/list/visitor-list.component';
import { CallLogListComponent } from './call-log/list/call-log-list.component';
import { PostalListComponent } from './postal/list/postal-list.component';
import { ComplainListComponent } from './complain/list/complain-list.component';

const routes: Routes = [
  { path: '', component: VisitorListComponent},
  { path: 'visitor', component: VisitorListComponent},
  { path: 'phone-call-log', component: CallLogListComponent },
  { path: 'postal', component: PostalListComponent },
  { path: 'complain', component: ComplainListComponent },
  { path: '**', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
