import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { PharmacySetupRoutingModule } from './pharmacy-setup-routing.module';
import { DashbaordPharmacySetupComponent } from './dashboard/dashboard-pharmacy-setup.component';
import { PharmacySetupService } from './shared/services/pharmacy-setup.service';
import { SetupMedicineGroupFormComponent } from './medicine-group/form/setup-medicine-group-form.component';
import { SetupMedicineGroupListComponent } from './medicine-group/list/setup-medicine-group-list.component';
import { SetupMedicineCompanyFormComponent } from './medicine-company/form/setup-medicine-company-form.component';
import { SetupMedicineCompanyListComponent } from './medicine-company/list/setup-medicine-company-list.component';
import { SetupMedicineUnitFormComponent } from './medicine-unit/form/setup-medicine-unit-form.component';
import { SetupMedicineUnitListComponent } from './medicine-unit/list/setup-medicine-unit-list.component';
import { SetupMedicineDoseDurationFormComponent } from './medicine-dose-duration/form/setup-medicine-dose-duration-form.component';
import { SetupMedicineDoseDurationListComponent } from './medicine-dose-duration/list/setup-medicine-dose-duration-list.component';
import { SetupMedicineDoseIntervalFormComponent } from './medicine-dose-interval/form/setup-medicine-dose-interval-form.component';
import { SetupMedicineDoseIntervalListComponent } from './medicine-dose-interval/list/setup-medicine-dose-interval-list.component';
import { SetupMedicineCategoryFormComponent } from './medicine-category/form/setup-medicine-category-form.component';
import { SetupMedicineCategoryListComponent } from './medicine-category/list/setup-medicine-category-list.component';
import { SetupMedicineDosageFormComponent } from './medicine-dosage/form/setup-medicine-dosage-form.component';
import { SetupMedicineDosageListComponent } from './medicine-dosage/list/setup-medicine-dosage-list.component';
import { SetupMedicineSupplierFormComponent } from './medicine-supplier/form/setup-medicine-supplier-form.component';
import { SetupMedicineSupplierListComponent } from './medicine-supplier/list/setup-medicine-supplier-list.component';

@NgModule({
  declarations: [
    DashbaordPharmacySetupComponent,
    SetupMedicineGroupFormComponent,
    SetupMedicineGroupListComponent,
    SetupMedicineCompanyFormComponent,
    SetupMedicineCompanyListComponent,
    SetupMedicineUnitFormComponent,
    SetupMedicineUnitListComponent,
    SetupMedicineDoseDurationFormComponent,
    SetupMedicineDoseDurationListComponent,
    SetupMedicineDoseIntervalFormComponent,
    SetupMedicineDoseIntervalListComponent,
    SetupMedicineCategoryFormComponent,
    SetupMedicineCategoryListComponent,
    SetupMedicineDosageFormComponent,
    SetupMedicineDosageListComponent,
    SetupMedicineSupplierFormComponent,
    SetupMedicineSupplierListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PharmacySetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    PharmacySetupService,
  ]
})
export class PharmacySetupModule { }
