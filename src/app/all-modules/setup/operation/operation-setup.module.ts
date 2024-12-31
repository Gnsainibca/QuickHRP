import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { OperationSetupRoutingModule } from './operation-setup.routing.module';
import { OperationSetupService } from './shared/services/operation-setup.service';
import { DashbaordOperationSetupComponent } from './dashboard/dashboard-operation-setup.component';
import { SetupOperationCategoryFormComponent } from './operation-category/form/setup-operation-category-form.component';
import { SetupOperationCategoryListComponent } from './operation-category/list/setup-operation-category-list.component';
import { SetupOperationFormComponent } from './operation/form/setup-operation-form.component';
import { SetupOperationListComponent } from './operation/list/setup-operation-list.component';

@NgModule({
  declarations: [
    DashbaordOperationSetupComponent,
    SetupOperationCategoryFormComponent,
    SetupOperationCategoryListComponent,
    SetupOperationFormComponent,
    SetupOperationListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OperationSetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    OperationSetupService,
  ]
})
export class OperationSetupModule { }
