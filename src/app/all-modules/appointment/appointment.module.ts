import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentListComponent } from './dashboard/list/appointment-list.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AppointmentFormComponent } from './dashboard/form/appointment-form.component';
import { AppointmentDataService } from './shared/services/appointment-data.service';
import { AppointmentViewComponent } from './dashboard/view/appointment-view.component';


@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentFormComponent,
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule,
    AgGridModule,
    NgxMaterialTimepickerModule,
    AppointmentViewComponent
  ],
  providers: [
    AppointmentDataService,
  ]
})
export class AppointmentModule { }
