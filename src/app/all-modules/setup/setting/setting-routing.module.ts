import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordSettingComponent } from './dashboard/dashboard-setting.component';

const routes: Routes = [
  { path: '', component: DashbaordSettingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
