import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { RadiologyFormComponent } from './dashbaord/form/radiology-form.component';
import { RadiologyListComponent } from './dashbaord/list/radiology-list.component';
import { RadiologyRoutingModule } from './radiology-routing.module';
import { RadiologyDataService } from './shared/services/radiology-data.service';
import { RadiologyTestListComponent } from './Test/list/radiology-test-list.component';
import { RadiologyTestFormComponent } from './Test/form/radiology-test-form.component';
import { RadiologyTestViewComponent } from './Test/view/radiology-test-view.component';
import { RadiologyApproveReportFormComponent } from './dashbaord/approve-report/radiology-approve-report-form.component';
import { RadiologySampleCollectionFormComponent } from './dashbaord/sample-collection/radiology-sample-collection-form.component';
import { RadiologyViewComponent } from './dashbaord/view/radiology-view.component';

@NgModule({
  declarations: [
    RadiologyListComponent,
    RadiologyFormComponent,
    RadiologyViewComponent,
    RadiologyTestListComponent,
    RadiologyTestFormComponent,
    RadiologyTestViewComponent,
    RadiologySampleCollectionFormComponent,
    RadiologyApproveReportFormComponent
  ],
  imports: [
    CommonModule,
    RadiologyRoutingModule,
    SharedModule,
    AgGridModule
  ],
  providers: [
    RadiologyDataService,
  ]
})
export class RadiologyModule { }
