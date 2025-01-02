import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';  
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { IPDListComponent } from './dashboard/list/ipd-list.component';
import { IPDFormComponent } from './dashboard/form/ipd-form.component';
import { IpdRoutingModule } from './ipd-routing.module';
import { IpdViewComponent } from './dashboard/view/ipd-view.component';
import { IpdDataService } from './shared/servives/Ipd.service';
import { IPDDetailsComponent } from './ipd-details/ipd-details.component';
import { IPDMedicationComponent } from './ipd-details/medication/ipd-medication.component';
import { IPDMedicationFormComponent } from './ipd-details/medication/form/ipd-medication-form.component';
import { IPDOperationFormComponent } from './ipd-details/operation/form/ipd-operation-form.component';
import { IPDPaymentFormComponent } from './ipd-details/payment/form/ipd-payment-form.component';
import { IPDPaymentListComponent } from './ipd-details/payment/list/ipd-payment-list.component';
import { IPDTimelineFormComponent } from './ipd-details/timeline/form/ipd-timeline-form.component';
import { IPDTimelineListComponent } from './ipd-details/timeline/list/ipd-timeline-list.component';
import { IPDVitalFormComponent } from './ipd-details/vital/form/ipd-vital-form.component';
import { IPDVitalListComponent } from './ipd-details/vital/list/ipd-vital-list.component';
import { IPDTreatmentHistoryComponent } from './ipd-details/treatment-history/ipd-treatment-history.component';
import { IPDChargeFormComponent } from './ipd-details/charge/form/ipd-charge-form.component';
import { IPDChargeListComponent } from './ipd-details/charge/list/ipd-charge-list.component';
import { IPDBillingOverviewComponent } from './ipd-details/overview/billing-info/ipd-billing-overview.component';
import { IPDPatientOverviewComponent } from './ipd-details/overview/patient-info/ipd-patient-overview.component';
import { IPDVitalOverviewComponent } from './ipd-details/overview/vital-info/ipd-vital-overview.component';
import { IPDMedicationOverviewComponent } from './ipd-details/overview/medication-info/ipd-medication-overview.component';
import { IPDOperationOverviewComponent } from './ipd-details/overview/operation-info/ipd-operation-overview.component';
import { IPDChargeOverviewComponent } from './ipd-details/overview/charge-info/ipd-charge-overview.component';
import { IPDPaymentOverviewComponent } from './ipd-details/overview/payment-info/ipd-payment-overview.component';
import { IPDVisitOverviewComponent } from './ipd-details/overview/visit-info/ipd-visit-overview.component';
import { IPDTimelineOverviewComponent } from './ipd-details/overview/timeline-info/ipd-timeline-overview.component';
import { IPDOperationListComponent } from './ipd-details/operation/list/ipd-operation-list.component';
import { IPDOverviewComponent } from './ipd-details/overview/ipd-overview.component';
import { IPDNurseNoteListComponent } from './ipd-details/nurse-note/list/ipd-nurse-note-list.component';
import { IPDNurseNoteFormComponent } from './ipd-details/nurse-note/form/ipd-nurse-note-form.component';
import { IPDNurseNoteCommentFormComponent } from './ipd-details/nurse-note/comment-form/ipd-nurse-note-comment-form.component';
import { IPDConsultantRegistrationFormComponent } from './ipd-details/consultant-register/form/ipd-consultant-registration-form.component';
import { IPDConsultantRegistrationListComponent } from './ipd-details/consultant-register/list/ipd-consultant-registration-list.component';
import { IPDBedHistoryListComponent } from './ipd-details/bed-history/list/ipd-bed-history-list.component';
import { IPDPrescriptionListComponent } from './ipd-details/prescription/list/ipd-prescription-list.component';
import { IPDPrescriptionFormComponent } from './ipd-details/prescription/form/ipd-prescription-form.component';
import { IpdPrescriptionViewComponent } from './ipd-details/prescription/view/ipd-prescription-view.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { IPDLabInvestigationListComponent } from './ipd-details/lab-investigation/list/ipd-lab-investigation-list.component';
import { IPDLabInvestigationOverviewComponent } from './ipd-details/overview/lab-investigation/ipd-lab-investigation-overview.component';
import { IPDConsultantRegisterOverviewComponent } from './ipd-details/overview/consultant-register/ipd-consultant-register-overview.component';
import { IPDPrescriptionOverviewComponent } from './ipd-details/overview/prescription/ipd-prescription-overview.component';
import { IPDBedHistoryOverviewComponent } from './ipd-details/overview/bed-history/ipd-bed-history-overview.component';
import { IPDTreatmentHistoryOverviewComponent } from './ipd-details/overview/treatment-history/ipd-treatment-history-overview.component';
import { IPDInfoOverviewComponent } from './ipd-details/overview/Ipd-info/ipd-info-overview.component';
import { DischargeFormComponent } from './ipd-details/discharge/discharge-form.component';
import { DischargeRevertFormComponent } from './ipd-details/discharge-revert/discharge-revert-form.component';
import { IPDDischargedPatientListComponent } from './dashboard/discharged-patient/ipd-discharged-patient-list.component';

@NgModule({
  declarations: [
    IPDListComponent,
    IPDDischargedPatientListComponent,
    IPDFormComponent,
    IpdViewComponent,
    IPDDetailsComponent,
    IPDMedicationComponent,
    IPDMedicationFormComponent,
    IPDOperationFormComponent,
    IPDOperationListComponent,
    IPDPaymentFormComponent,
    IPDPaymentListComponent,
    IPDTimelineFormComponent,
    IPDTimelineListComponent,
    IPDVitalFormComponent,
    IPDVitalListComponent,
    IPDTreatmentHistoryComponent,
    IPDChargeFormComponent,
    IPDChargeListComponent,
    IPDOverviewComponent,
    IPDBillingOverviewComponent,
    IPDPatientOverviewComponent,
    IPDVitalOverviewComponent,
    IPDMedicationOverviewComponent,
    IPDOperationOverviewComponent,
    IPDChargeOverviewComponent,
    IPDPaymentOverviewComponent,
    IPDVisitOverviewComponent,
    IPDTimelineOverviewComponent,
    IPDNurseNoteListComponent,
    IPDNurseNoteFormComponent,
    IPDNurseNoteCommentFormComponent,
    IPDConsultantRegistrationFormComponent,
    IPDConsultantRegistrationListComponent,
    IPDBedHistoryListComponent,
    IPDPrescriptionListComponent,
    IPDPrescriptionFormComponent,
    IpdPrescriptionViewComponent,
    IPDLabInvestigationListComponent,
    IPDLabInvestigationOverviewComponent,
    IPDConsultantRegisterOverviewComponent,
    IPDPrescriptionOverviewComponent,
    IPDBedHistoryOverviewComponent,
    IPDTreatmentHistoryOverviewComponent,
    IPDInfoOverviewComponent,
    DischargeFormComponent,
    DischargeRevertFormComponent
  ],
  imports: [
    CommonModule,
    IpdRoutingModule,
    SharedModule,
    AgGridModule,
    NgxMaterialTimepickerModule,
    NgxSliderModule,
    NgMultiSelectDropDownModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
    IpdDataService,
  ]
})
export class IpdModule { }
