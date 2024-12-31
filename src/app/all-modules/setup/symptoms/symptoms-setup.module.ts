import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { SymptomsSetupRoutingModule } from './symptoms-setup-routing.module';
import { SymptomsSetupService } from './shared/services/symptoms-setup.service';
import { DashbaordSymptomsSetupComponent } from './dashboard/dashboard-symptoms-setup.component';
import { SetupSymptomsTypeFormComponent } from './symptoms-type/form/setup-symptoms-type-form.component';
import { SetupSymptomsHeadFormComponent } from './symptoms-head/form/setup-symptoms-head-form.component';
import { SetupSymptomsHeadListComponent } from './symptoms-head/list/setup-symptoms-head-list.component';
import { SetupSymptomsTypeListComponent } from './symptoms-type/list/setup-symptoms-type-list.component';

@NgModule({
  declarations: [
    DashbaordSymptomsSetupComponent,
    SetupSymptomsTypeFormComponent,
    SetupSymptomsTypeListComponent,
    SetupSymptomsHeadFormComponent,
    SetupSymptomsHeadListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SymptomsSetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    SymptomsSetupService,
  ]
})
export class SymptomsSetupModule { }
