import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { FindingsSetupRoutingModule } from './findings-setup-routing.module';
import { FindingsSetupService } from './shared/services/findings-setup.service';
import { DashbaordFindingsSetupComponent } from './dashboard/dashboard-findings-setup.component';
import { SetupFindingsCategoryFormComponent } from './findings-category/form/setup-findings-category-form.component';
import { SetupFindingsCategoryListComponent } from './findings-category/list/setup-findings-category-list.component';
import { SetupFindingsFormComponent } from './findings/form/setup-findings-form.component';
import { SetupFindingsListComponent } from './findings/list/setup-findings-list.component';

@NgModule({
  declarations: [
    DashbaordFindingsSetupComponent,
    SetupFindingsCategoryFormComponent,
    SetupFindingsCategoryListComponent,
    SetupFindingsFormComponent,
    SetupFindingsListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FindingsSetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    FindingsSetupService,
  ]
})
export class FindingsSetupModule { }
