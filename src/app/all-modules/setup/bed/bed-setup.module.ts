import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { DashbaordHospitalBedSetupComponent } from './dashboard/dashboard-hospital-bed-setup.component';
import { SetupBedFormComponent } from './bed/form/setup-bed-form.component';
import { SetupBedListComponent } from './bed/list/setup-bed-list.component';
import { SetupBedTypeFormComponent } from './bed-type/form/setup-bed-type-form.component';
import { SetupBedTypeListComponent } from './bed-type/list/setup-bed-type-list.component';
import { SetupBedGroupFormComponent } from './bed-group/form/setup-bed-group-form.component';
import { SetupBedGroupListComponent } from './bed-group/list/setup-bed-group-list.component';
import { SetupFloorFormComponent } from './floor/form/setup-floor-form.component';
import { SetupFloorListComponent } from './floor/list/setup-floor-list.component';
import { BedSetupRoutingModule } from './bed-setup-routing.module';
import { BedSetupService } from './shared/services/bed-setup.service';


@NgModule({
  declarations: [
    DashbaordHospitalBedSetupComponent,
    SetupBedFormComponent,
    SetupBedListComponent,
    SetupBedTypeFormComponent,
    SetupBedTypeListComponent,
    SetupBedGroupFormComponent,
    SetupBedGroupListComponent,
    SetupFloorFormComponent,
    SetupFloorListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BedSetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    BedSetupService,
  ]
})
export class BedSetupModule { }
