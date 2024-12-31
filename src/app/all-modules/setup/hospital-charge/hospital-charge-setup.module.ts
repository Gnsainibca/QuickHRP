import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { DashbaordHospitalChargeSetupComponent } from './dashboard/dashboard-hospital-charge-setup.component';
import { SetupHospitalChargeFormComponent } from './charge/form/setup-hospital-charge-form.component';
import { SetupHospitalChargeListComponent } from './charge/list/setup-hospital-charge-list.component';
import { HospitalChargeSetupRoutingModule } from './hospital-charge-setup-routing.module';
import { HospitalChargeSetupService } from './shared/services/hospital-charge-setup.service';
import { SetupHospitalUnitTypeFormComponent } from './unit-type/form/setup-hospital-unit-type-form.component';
import { SetupHospitalUnitTypeListComponent } from './unit-type/list/setup-hospital-unit-type-list.component';
import { SetupHospitalTaxCategoryFormComponent } from './tax-category/form/setup-hospital-tax-category-form.component';
import { SetupHospitalTaxCategoryListComponent } from './tax-category/list/setup-hospital-tax-category-list.component';
import { SetupHospitalChargeTypeFormComponent } from './charge-type/form/setup-hospital-charge-type-form.component';
import { SetupHospitalChargeTypeListComponent } from './charge-type/list/setup-hospital-charge-type-list.component';
import { SetupHospitalChargeCategoryFormComponent } from './charge-category/form/setup-hospital-charge-category-form.component';
import { SetupHospitalChargeCategoryListComponent } from './charge-category/list/setup-hospital-charge-category-list.component';

@NgModule({
  declarations: [
    DashbaordHospitalChargeSetupComponent,
    SetupHospitalUnitTypeFormComponent,
    SetupHospitalUnitTypeListComponent,
    SetupHospitalTaxCategoryFormComponent,
    SetupHospitalTaxCategoryListComponent,
    SetupHospitalChargeTypeFormComponent,
    SetupHospitalChargeTypeListComponent,
    SetupHospitalChargeCategoryFormComponent,
    SetupHospitalChargeCategoryListComponent,
    SetupHospitalChargeFormComponent,
    SetupHospitalChargeListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HospitalChargeSetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    HospitalChargeSetupService,
  ]
})
export class HospitalChargeSetupModule { }
