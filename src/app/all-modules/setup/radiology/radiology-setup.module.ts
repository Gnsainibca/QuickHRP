import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { DashbaordRadiologySetupComponent } from './dashboard/dashboard-radiology-setup.component';
import { SetupRadiologyCategoryFormComponent } from './radiology-category/form/setup-radiology-category-form.component';
import { SetupRadiologyCategoryListComponent } from './radiology-category/list/setup-radiology-category-list.component';
import { SetupRadiologyUnitFormComponent } from './radiology-unit/form/setup-radiology-unit-form.component';
import { SetupRadiologyUnitListComponent } from './radiology-unit/list/setup-radiology-unit-list.component';
import { SetupRadiologyParameterFormComponent } from './radiology-parameter/form/setup-radiology-parameter-form.component';
import { SetupRadiologyParameterListComponent } from './radiology-parameter/list/setup-radiology-parameter-list.component';
import { RadiologySetupRoutingModule } from './radiology-setup-routing.module';
import { RadiologySetupService } from './shared/services/radiology-setup.service';

@NgModule({
  declarations: [
    DashbaordRadiologySetupComponent,
    SetupRadiologyCategoryFormComponent,
    SetupRadiologyCategoryListComponent,
    SetupRadiologyUnitFormComponent,
    SetupRadiologyUnitListComponent,
    SetupRadiologyParameterFormComponent,
    SetupRadiologyParameterListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RadiologySetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    RadiologySetupService,
  ]
})
export class RadiologySetupModule { }
