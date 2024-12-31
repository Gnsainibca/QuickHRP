import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { OpdDataService } from '../../shared/services/opd.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientVisit } from '../../shared/models/patient-visit';
import { CommonService } from 'src/app/shared/data/common.service';
import { SimpleRecord, SimpleRecordWithParent } from 'src/app/shared/models/simple-record';
import { Master_HospitalChargeDetails } from 'src/app/all-modules/setup/hospital-charge/shared/models/master_hospital-charge';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Charge_Module } from 'src/app/shared/enums/charge-module';
import { SymptomsSetupService } from 'src/app/all-modules/setup/symptoms/shared/services/symptoms-setup.service';
import { Master_SymptomsType } from 'src/app/all-modules/setup/symptoms/shared/models/master-symptoms-type';
import { Master_SymptomsHeadList } from 'src/app/all-modules/setup/symptoms/shared/models/master-symptoms-head';
import { ToasterService } from 'src/app/shared/core.index';
import { PatientFormComponent } from 'src/app/shared/components/patient-form/patient-form.component';

@Component({
  selector: 'app-opd-form',
  templateUrl: './opd-form.component.html',
  styleUrls: ['./opd-form.component.scss']
})
export class OpdFormComponent {

  @Input() isEdit !: boolean;
  @Input() patientVisitId: number | undefined;
  @Output() onSave = new EventEmitter<boolean>();

  // In case of visit
  @Input() isVisitOperation: boolean = false;
  @Input() opdPatientId: number = 0;

  opdForm!: UntypedFormGroup;
  patientList: Array<SimpleRecord> = [];

  typeaheadLoading: boolean = false;
  typeaheadNoResults: boolean = false;

  symptomsTypes: Array<Master_SymptomsType> = [];
  symptomsTitles: Array<Master_SymptomsHeadList> = [];
  filteredSymptomsTitles: Array<Master_SymptomsHeadList> = [];
  dropdownSettings = {};

  chargeTypeList: Array<SimpleRecord> = [];
  chargeList: Array<Master_HospitalChargeDetails> = [];
  doctors: Array<SimpleRecord> = [];

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, private toaster: ToasterService,
    private fb: FormBuilder, private datePipe: DatePipe, private data: OpdDataService, private commonService: CommonService,
    private hospitalChargeService: HospitalChargeSetupService,
    symptomsSetupService: SymptomsSetupService) {
    this.symptomsTitles = symptomsSetupService.getSymptomsHeadList();
    this.symptomsTypes = symptomsSetupService.getSymptomsTypeList();
    this.chargeTypeList = hospitalChargeService.getChargeCategoriesByModuleId(Charge_Module.OPD);
    this.patientList = commonService.getPatientNameList();
    this.doctors = commonService.getDoctorsNameList();
  }

  ngOnInit() {
    var date = new Date();
    this.opdForm = this.fb.group({
      opdPatientId: [null],
      patientName: [null, [Validators.required]],
      patientId: [null],
      symptomsTypes: [null],
      symptomsTitles: [null],
      symptomsDescription: [null],
      anyKnownAllergies: [null],
      previousMedicalIssue: [null],
      note: [null],
      appointmentDate: [this.datePipe.transform(date, "dd-MMM-yyyy"), [Validators.required]],
      caseId: [null],
      anyCasualty: [false],
      isOldPatient: [false],
      reference: [null],
      consultantDoctorId: ['', [Validators.required]],
      applyTPA: [false],
      chargeCategoryId: ['', [Validators.required]],
      chargeId: ['', [Validators.required]],
      standardCharge: [null],
      appliedCharge: [null, [Validators.required]],
      discount: [null, [Validators.min(1), Validators.max(100)]],
      tax: [null],
      amount: [null],
      paidAmount: [null],
      paymentMode: ['', [Validators.required]],
      needLiveConsultation: [false]
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.setFormControls();
    this.setControlsState();
  }

  private setFormControls() {
    if (this.isEdit) {
      let patientVisit = this.data.getPatientVisits().find(x => x.id == this.patientVisitId)!;
      let opdPatient = this.data.getOpdPatientById(patientVisit.opdPatientId);
      let patient = this.patientList.find(x => x.id === opdPatient.patientId);
      this.f['opdPatientId'].setValue(patientVisit?.opdPatientId);
      this.f['patientId'].setValue(patient?.id);
      this.f['patientName'].setValue(patient?.name);
      this.f['symptomsTypes'].setValue(patientVisit.symptomsTypes);
      this.setSymptomsTypeItemWise(null);
      this.f['symptomsTitles'].setValue(patientVisit.symptomsTitles);
      this.f['symptomsDescription'].setValue(patientVisit.symptomsDescription);
      this.f['anyKnownAllergies'].setValue(patientVisit.anyKnownAllergies);
      this.f['previousMedicalIssue'].setValue(patientVisit.previousMedicalIssue);
      this.f['note'].setValue(patientVisit.note);
      this.f['appointmentDate'].setValue(new Date(patientVisit.appointmentDate));
      this.f['caseId'].setValue(patientVisit.caseId);
      this.f['anyCasualty'].setValue(patientVisit.anyCasualty);
      this.f['isOldPatient'].setValue(patientVisit.isOldPatient);
      this.f['reference'].setValue(patientVisit.reference);
      this.f['consultantDoctorId'].setValue(patientVisit.consultantDoctorId);
      this.f['applyTPA'].setValue(patientVisit.applyTPA);
      this.f['chargeCategoryId'].setValue(patientVisit.chargeCategoryId);
      this.onChargeCategoryChange();
      this.f['chargeId'].setValue(patientVisit.chargeId);
      this.f['standardCharge'].setValue(patientVisit.standardCharge);
      this.f['appliedCharge'].setValue(patientVisit.appliedCharge);
      this.f['discount'].setValue(patientVisit.discount);
      this.f['tax'].setValue(patientVisit.tax);
      this.f['amount'].setValue(patientVisit.amount);
      this.f['paidAmount'].setValue(patientVisit.paidAmount);
      this.f['paymentMode'].setValue(patientVisit.paymentMode);
      this.f['needLiveConsultation'].setValue(patientVisit.needLiveConsultation);
    }
    else if (this.isVisitOperation) {
      // In case of visit, patient details would be auto filled.
      let opdPatient = this.data.getOpdPatientById(this.opdPatientId)
      let patient = this.patientList.find(x => x.id === opdPatient.patientId);
      this.f['opdPatientId'].setValue(this.opdPatientId);
      this.f['patientId'].setValue(patient?.id);
      this.f['patientName'].setValue(patient?.name);
    }
    this.f['date']?.disable();
  }

  private setControlsState() {
    this.f['tax']?.disable();
    this.f['standardCharge']?.disable();
    this.f['amount']?.disable();
    this.f['chargeId']?.disable();
    if (this.isVisitOperation) {
      this.f['patientName']?.disable();
    }
  }

  public setSymptomsTypeItemWise(item: any) {
    let selectedSymptomsTypeIds: Array<SimpleRecord> = this.f['symptomsTypes'].value;
    this.setSymptomsTitles(selectedSymptomsTypeIds);
  }

  public setSymptomsTypeWithAllItems(selectedSymptomsTitles: any) {
    this.setSymptomsTitles(selectedSymptomsTitles);
  }

  private setSymptomsTitles(selectedItems: Array<SimpleRecord>) {
    this.f['symptomsTitles'].setValue(null);
    this.f['symptomsDescription'].setValue(null);
    this.filteredSymptomsTitles = this.symptomsTitles.filter(x => selectedItems?.some(y => y.id === x.typeId));
  }

  public setSymptomsDescriptionItemWise(item: any) {
    let selectedFindings: Array<SimpleRecordWithParent> = this.f['symptomsTypes'].value;
    this.setSymptomsDescription(selectedFindings);
  }

  public setSymptomsDescriptionWithAllItems(selectedFindings: any) {
    this.setSymptomsDescription(selectedFindings);
  }

  private setSymptomsDescription(selectedItems: Array<SimpleRecordWithParent>) {
    this.f['symptomsDescription'].setValue(null);
    const symptomsDescription = this.filteredSymptomsTitles.filter(x => selectedItems?.some(y => y.id === x.typeId)).map(x => x.description).join('\n\n');
    this.f['symptomsDescription'].setValue(symptomsDescription);
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.f['patientId'].setValue(e.item.id);
    // console.log('Selected value: ', this.f['patientId'].value);
  }

  onChargeCategoryChange() {
    this.f['chargeId'].setValue(null);
    this.resetChargeControls();
    this.chargeList = this.hospitalChargeService.getHospitalCharges().filter(x => x.chargeCategoryId === this.f['chargeCategoryId'].value);
    this.f['chargeId']?.disable();
    if (this.chargeList?.length > 0) {
      this.f['chargeId'].setValue('');
      this.f['chargeId']?.enable();
    }
  }

  addPatient() {
      const modalRef = this.modalService.open(PatientFormComponent, { backdrop: 'static', size: 'xl', scrollable: true });
      modalRef.componentInstance.onSave.subscribe((patientId: number) => {
        this.patientList = this.commonService.getPatientNameList();
        this.f['patientId'].setValue(patientId);
        this.f['patientName'].setValue(this.patientList.find(x=>x.id==patientId)?.name);
        modalRef.close();
      });
    }

  onChargeChange() {
    let charge = this.chargeList.find(x => x.id === this.f['chargeId'].value);
    this.resetChargeControls();
    if (charge) {
      this.f['tax'].setValue(charge.tax);
      this.f['standardCharge'].setValue(charge.standardCharge);
      this.f['appliedCharge'].setValue(charge.standardCharge);
      this.calculateTotalAmount();
    }
  }

  private resetChargeControls() {
    this.f['tax'].setValue(null);
    this.f['discount'].setValue(null);
    this.f['standardCharge'].setValue(null);
    this.f['appliedCharge'].setValue(null);
    this.f['amount'].setValue(null);
    this.f['paidAmount'].setValue(null);
  }

  private calculateTotalAmount() {
    let discount = this.f['discount'].value;
    let tax = this.f['tax'].value;
    let appliedCharge = this.f['appliedCharge'].value;
    let amountAfterDiscount = appliedCharge - (appliedCharge * (discount / 100));
    let total = (amountAfterDiscount + (amountAfterDiscount * (tax / 100)));
    this.f['amount'].setValue(total);
    this.f['paidAmount'].setValue(total);
  }

  onDiscountInputKeyup(event: any) {
    this.calculateTotalAmount();
  }

  get f() {
    return this.opdForm.controls;
  }

  onSubmit() {
    this.opdForm.markAllAsTouched();
    if (this.opdForm.valid) {
      const patientVisit: PatientVisit = this.opdForm.getRawValue();
      if (this.isEdit) {
        patientVisit.id = this.patientVisitId!;
        this.data.updateOpdPatient(patientVisit);
      }
      else if (this.isVisitOperation) {
        this.data.addPatientVisit(patientVisit);
      }
      else {
        this.data.addOpdPatient(patientVisit);

      }
      this.onSave.next(true);
      let message = '';
      if (this.isVisitOperation) {
        message = this.isEdit ? 'Patient visit has been updated successfully!' : 'Patient visit has been added successfully!'
      }
      else {
        message = this.isEdit ? 'Opd patient details has been updated successfully!' : 'Opd patient details has been added successfully!'
      }
      this.toaster.typeSuccess(message, 'Success!');
    }
  }
}
