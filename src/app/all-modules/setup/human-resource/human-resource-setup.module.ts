import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { DashbaordHumanResourceSetupComponent } from './dashboard/dashboard-human-resource-setup.component';
import { SetupDesignationFormComponent } from './designation/form/setup-designation-form.component';
import { SetupDesignationListComponent } from './designation/list/setup-designation-list.component';
import { SetupSpecialistFormComponent } from './specialist/form/setup-specialist-form.component';
import { SetupSpecialistListComponent } from './specialist/list/setup-specialist-list.component';
import { HumanResourceSetupRoutingModule } from './human-resource-setup-routing.module';
import { HumanResourceSetupService } from './shared/services/human-resource-setup.service';
import { SetupLeaveTypeFormComponent } from './leave-type/form/setup-leave-type-form.component';
import { SetupLeaveTypeListComponent } from './leave-type/list/setup-leave-type-list.component';
import { SetupDepartmentFormComponent } from './department/form/setup-department-form.component';
import { SetupDepartmentListComponent } from './department/list/setup-department-list.component';
import { SetupContractTypeFormComponent } from './contract-type/form/setup-contract-type-form.component';
import { SetupContractTypeListComponent } from './contract-type/list/setup-contract-type-list.component';


@NgModule({
  declarations: [
    DashbaordHumanResourceSetupComponent,
    SetupLeaveTypeFormComponent,
    SetupLeaveTypeListComponent,
    SetupDepartmentFormComponent,
    SetupDepartmentListComponent,
    SetupDesignationFormComponent,
    SetupDesignationListComponent,
    SetupSpecialistFormComponent,
    SetupSpecialistListComponent,
    SetupContractTypeFormComponent,
    SetupContractTypeListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HumanResourceSetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    HumanResourceSetupService,
  ]
})
export class HumanResourceSetupModule { }
