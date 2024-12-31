import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { SetupVitalFormComponent } from './dashboard/form/setup-vital-form.component';
import { SetupVitalListComponent } from './dashboard/list/setup-vital-list.component';
import { VitalSetupRoutingModule } from './vital-setup-routing.module';
import { VitalSetupService } from './shared/services/vital-setup.service';

@NgModule({
  declarations: [
    SetupVitalFormComponent,
    SetupVitalListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VitalSetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    VitalSetupService,
  ]
})
export class VitalSetupModule { }
