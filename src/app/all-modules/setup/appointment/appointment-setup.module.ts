import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { DashboardAppointmentSetupComponent } from './dashboard/dashboard-appointment-setup.component';
import { AppointmentSetupRoutingModule } from './appointment-setup-routing.module';
import { AppointmentSetupService } from './shared/services/appointment-setup.service';
import { SetupAppointmentPriorityFormComponent } from './appointment-priority/form/setup-appointment-priority-form.component';
import { SetupAppointmentPriorityListComponent } from './appointment-priority/list/setup-appointment-priority-list.component';
import { SetupShiftFormComponent } from './shift/form/setup-shift-form.component';
import { SetupShiftListComponent } from './shift/list/setup-shift-list.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SetupDoctorShiftListComponent } from './doctor-shift/list/setup-doctor-shift-list.component';
import { SetupDoctorShiftFormComponent } from './doctor-shift/form/setup-doctor-shift-form.component';
import { SetupAppointmentSourceFormComponent } from './appointment-source/form/setup-appointment-source-form.component';
import { SetupAppointmentSourceListComponent } from './appointment-source/list/setup-appointment-source-list.component';
import { SetupAppointmentStatusFormComponent } from './appointment-status/form/setup-appointment-status-form.component';
import { SetupAppointmentStatusListComponent } from './appointment-status/list/setup-appointment-status-list.component';

@NgModule({
  declarations: [
    DashboardAppointmentSetupComponent,
    SetupShiftFormComponent,
    SetupShiftListComponent,
    SetupAppointmentPriorityFormComponent,
    SetupAppointmentPriorityListComponent,
    SetupAppointmentSourceFormComponent,
    SetupAppointmentSourceListComponent,
    SetupAppointmentStatusFormComponent,
    SetupAppointmentStatusListComponent,
    SetupDoctorShiftFormComponent,
    SetupDoctorShiftListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaterialTimepickerModule,
    AppointmentSetupRoutingModule,
    AgGridModule,
  ],
  providers: [
    AppointmentSetupService,
  ]
})
export class AppointmentSetupModule { }
