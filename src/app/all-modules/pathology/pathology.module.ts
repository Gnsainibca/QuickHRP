import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { PathologyFormComponent } from './dashbaord/form/pathology-form.component';
import { PathologyListComponent } from './dashbaord/list/pathology-list.component';
import { PathologyViewComponent } from './dashbaord/view/pathology-view.component';
import { PathologyRoutingModule } from './pathology-routing.module';
import { PathologyDataService } from './shared/services/pathology-data.service';
import { PathologyTestListComponent } from './Test/list/pathology-test-list.component';
import { PathologyTestFormComponent } from './Test/form/pathology-test-form.component';
import { PathologyTestViewComponent } from './Test/view/pathology-test-view.component';
import { SampleCollectionFormComponent } from './dashbaord/sample-collection/sample-collection-form.component';
import { ApproveReportFormComponent } from './dashbaord/approve-report/approve-report-form.component';

@NgModule({
  declarations: [
    PathologyListComponent,
    PathologyFormComponent,
    PathologyViewComponent,
    PathologyTestListComponent,
    PathologyTestFormComponent,
    PathologyTestViewComponent,
    SampleCollectionFormComponent,
    ApproveReportFormComponent
  ],
  imports: [
    CommonModule,
    PathologyRoutingModule,
    SharedModule,
    AgGridModule
  ],
  providers: [
    PathologyDataService,
  ]
})
export class PathologyModule { }
