import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { DashbaordFrontOfficeSetupComponent } from './dashboard/dashboard-front-office-setup.component';
import { FrontOfficeSetupService } from './shared/services/front-office-setup.service';
import { SetupComplainTypeListComponent } from './complain-type/list/setup-complain-type-list.component';
import { SetupComplainTypeFormComponent } from './complain-type/form/setup-complain-type-form.component';
import { SetupPurposeFormComponent } from './purpose/form/setup-purpose-form.component';
import { SetupPurposeListComponent } from './purpose/list/setup-purpose-list.component';
import { SetupSourceFormComponent } from './source/form/setup-source-form.component';
import { SetupSourceListComponent } from './source/list/setup-source-list.component';
import { FrontOfficeSetupRoutingModule } from './front-office-setup-routing.module';

@NgModule({
  declarations: [
    DashbaordFrontOfficeSetupComponent,
    SetupSourceFormComponent,
    SetupSourceListComponent,
    SetupComplainTypeFormComponent,
    SetupComplainTypeListComponent,
    SetupPurposeFormComponent,
    SetupPurposeListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FrontOfficeSetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    FrontOfficeSetupService,
  ]
})
export class FrontOfficeSetupModule { }
