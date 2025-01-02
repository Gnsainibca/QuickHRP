import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { OpdRoutingModule } from './opd-routing.module';
import { OPDListComponent } from './dashboard/list/opd-list.component';
import { OpdFormComponent } from './dashboard/form/opd-form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';  
import { OpdDataService } from './shared/services/opd.service';
import { OpdViewComponent } from './dashboard/view/opd-view.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { VisitListComponent } from './visit-details/visit/list/visit-list.component';
import { MedicationComponent } from './visit-details/medication/medication.component';
import { MedicationFormComponent } from './visit-details/medication/form/medication-form.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { OperationFormComponent } from './visit-details/operation/form/operation-form.component';
import { OperationListComponent } from './visit-details/operation/list/operation-list.component';
import { TimelineFormComponent } from './visit-details/timeline/form/timeline-form.component';
import { TimelineListComponent } from './visit-details/timeline/list/timeline-list.component';
import { PaymentFormComponent } from './visit-details/payment/form/payment-form.component';
import { PaymentListComponent } from './visit-details/payment/list/payment-list.component';
import { VitalFormComponent } from './visit-details/vital/form/vital-form.component';
import { VitalListComponent } from './visit-details/vital/list/vital-list.component';
import { TreatmentHistoryComponent } from './visit-details/treatment-history/treatment-history.component';
import { OpdChargeFormComponent } from './visit-details/charge/form/opd-charge-form.component';
import { OPDChargeListComponent } from './visit-details/charge/list/opd-charge-list.component';
import { OverviewComponent } from './visit-details/overview/overview.component';
import { BillingOverviewComponent } from './visit-details/overview/billing-info/billing-overview.component';
import { PatientOverviewComponent } from './visit-details/overview/patient-info/patient-overview.component';
import { VitalOverviewComponent } from './visit-details/overview/vital-info/vital-overview.component';
import { MedicationOverviewComponent } from './visit-details/overview/medication-info/medication-overview.component';
import { OperationOverviewComponent } from './visit-details/overview/operation-info/operation-overview.component';
import { ChargeOverviewComponent } from './visit-details/overview/charge-info/charge-overview.component';
import { PaymentOverviewComponent } from './visit-details/overview/payment-info/payment-overview.component';
import { VisitOverviewComponent } from './visit-details/overview/visit-info/visit-overview.component';
import { TimelineOverviewComponent } from './visit-details/overview/timeline-info/timeline-overview.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { OPDLabInvestigationListComponent } from './visit-details/lab-investigation/list/opd-lab-investigation-list.component';

@NgModule({
  declarations: [
    OPDListComponent,
    OpdFormComponent,
    OpdViewComponent,
    VisitDetailsComponent,
    VisitListComponent,
    MedicationComponent,
    MedicationFormComponent,
    OperationFormComponent,
    OperationListComponent,
    PaymentFormComponent,
    PaymentListComponent,
    TimelineFormComponent,
    TimelineListComponent,
    VitalFormComponent,
    VitalListComponent,
    TreatmentHistoryComponent,
    OpdChargeFormComponent,
    OPDChargeListComponent,
    OverviewComponent,
    BillingOverviewComponent,
    PatientOverviewComponent,
    VitalOverviewComponent,
    MedicationOverviewComponent,
    OperationOverviewComponent,
    ChargeOverviewComponent,
    PaymentOverviewComponent,
    VisitOverviewComponent,
    TimelineOverviewComponent,
    OPDLabInvestigationListComponent
  ],
  imports: [
    CommonModule,
    OpdRoutingModule,
    SharedModule,
    AgGridModule,
    NgxMaterialTimepickerModule,
    NgxSliderModule,
    NgMultiSelectDropDownModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
    OpdDataService,
  ]
})
export class OpdModule { }
