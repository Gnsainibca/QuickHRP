import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { StaffFormComponent } from './dashbaord/form/staff-form.component';
import { StaffListComponent } from './dashbaord/list/staff-list.component';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffService } from './shared/services/staff-data.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatExpansionModule} from '@angular/material/expansion';
import { StaffViewComponent } from './dashbaord/view/staff-view.component';

@NgModule({
  declarations: [
    StaffFormComponent,
    StaffListComponent,
    StaffViewComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
    AgGridModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatExpansionModule
  ],
  providers: [
    StaffService,
  ]
})
export class StaffModule { }
