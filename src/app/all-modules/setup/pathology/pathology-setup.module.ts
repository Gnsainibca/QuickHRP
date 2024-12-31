import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { DashbaordPathologySetupComponent } from './dashboard/dashboard-pathology-setup.component';
import { SetupPathologyCategoryFormComponent } from './pathology-category/form/setup-pathology-category-form.component';
import { SetupPathologyCategoryListComponent } from './pathology-category/list/setup-pathology-category-list.component';
import { SetupPathologyUnitFormComponent } from './pathology-unit/form/setup-pathology-unit-form.component';
import { SetupPathologyUnitListComponent } from './pathology-unit/list/setup-pathology-unit-list.component';
import { SetupPathologyParameterFormComponent } from './pathology-parameter/form/setup-pathology-parameter-form.component';
import { SetupPathologyParameterListComponent } from './pathology-parameter/list/setup-pathology-parameter-list.component';
import { PathologySetupRoutingModule } from './pathology-setup-routing.module';
import { PathologySetupService } from './shared/services/pathology-setup.service';

@NgModule({
  declarations: [
    DashbaordPathologySetupComponent,
    SetupPathologyCategoryFormComponent,
    SetupPathologyCategoryListComponent,
    SetupPathologyUnitFormComponent,
    SetupPathologyUnitListComponent,
    SetupPathologyParameterFormComponent,
    SetupPathologyParameterListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PathologySetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    PathologySetupService,
  ]
})
export class PathologySetupModule { }
