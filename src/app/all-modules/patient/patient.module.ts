import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { PatientListComponent } from './dashbaord/list/patient-list.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientService } from './shared/services/patient-data.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatExpansionModule} from '@angular/material/expansion';
import { PatientViewComponent } from './dashbaord/view/patient-view.component';

@NgModule({
  declarations: [
    PatientListComponent,
    PatientViewComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    AgGridModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatExpansionModule
  ],
  providers: [
    PatientService,
  ]
})
export class PatientModule { }
