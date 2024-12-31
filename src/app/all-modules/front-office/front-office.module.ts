import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { FrontOfficeRoutingModule } from './front-office-routing.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { VisitorListComponent } from './visitor/list/visitor-list.component';
import { VisitorFormComponent } from './visitor/form/visitor-form.component';
import { FrontOfficeDataService } from './shared/services/front-office.service';
import { CallLogListComponent } from './call-log/list/call-log-list.component';
import { CallLogFormComponent } from './call-log/form/call-log-form.component';
import { PostalListComponent } from './postal/list/postal-list.component';
import { PostalFormComponent } from './postal/form/postal-form.component';
import { ComplainListComponent } from './complain/list/complain-list.component';
import { ComplainFormComponent } from './complain/form/complain-form.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';  
import { CallLogViewComponent } from './call-log/view/call-log-view.component';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';
import { ComplainViewComponent } from './complain/view/complain-view.component';
import { PostalViewComponent } from './postal/view/postal-view.component';
import { VisitorViewComponent } from './visitor/view/visitor-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    VisitorListComponent,
    VisitorFormComponent,
    CallLogListComponent,
    CallLogFormComponent,
    PostalListComponent,
    PostalFormComponent,
    ComplainListComponent,
    ComplainFormComponent,
    CallLogViewComponent,
    ComplainViewComponent,
    PostalViewComponent,
    VisitorViewComponent,
  ],
  imports: [
    FrontOfficeRoutingModule,
    SharedModule,
    AgGridModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
    // MatAutocompleteModule,
    TypeaheadModule.forRoot(),
    GridActionButtonComponent,
  ],
  providers: [
    FrontOfficeDataService,
  ]
})
export class FrontOfficeModule { }
