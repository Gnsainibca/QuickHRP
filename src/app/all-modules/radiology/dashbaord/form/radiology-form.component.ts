import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RadiologyDataService } from '../../shared/services/radiology-data.service';
import { Radiology, RadiologyTest } from '../../shared/models/radiology';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { parseDate } from 'ngx-bootstrap/chronos';
import { CommonService } from 'src/app/shared/data/common.service';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Master_PaymentMode } from 'src/app/all-modules/setup/hospital-charge/shared/models/master_payment-mode';

@Component({
  selector: 'radiology-form',
  templateUrl: './radiology-form.component.html',
  styleUrls: ['./radiology-form.component.scss']
})
export class RadiologyFormComponent {
  radiologyForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  date: Date = new Date();
  patients: Array<SimpleRecord> = [];
  radiologyTest: Array<RadiologyTest> = [];
  doctors: Array<SimpleRecord> = [];
  paymentModes: Array<Master_PaymentMode> = [];
  billNo: string = '';
  caseId : string = '';

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private datePipe: DatePipe,
    private data: RadiologyDataService, private commonService : CommonService, hospitalChargeSetupService : HospitalChargeSetupService) {
    this.doctors = this.commonService.getDoctorsNameList();
    this.paymentModes = hospitalChargeSetupService.getPaymentModeList();
    this.patients = this.commonService.getPatientNameList();
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
    this.radiologyTest = this.data.getRadiologyTests().sort((a, b) => b.id - a.id);
  }

  initializerForm() {
    this.radiologyForm = this.fb.group({
      patientId: ['', [Validators.required]],
      prescriptionNo: [null],
      date: [this.date],
      testInnerForm: this.fb.array(
        [
          this.fb.group(
            {
              testId: ['', [Validators.required]],
              reportDays: [{ value: null, disabled: true }],
              reportDate: [{ value: null, disabled: true }],
              amount: [{ value: null, disabled: true }],
              tax: [{ value: null, disabled: true }]
            }
          )
        ]
      ),
      referralDoctorId: [''],
      doctorName: [null],
      totalAmount: [0],
      totalTax: [0],
      discount: [0],
      netAmount: [0],
      paymentModeId: ['', [Validators.required]],
      previousReportValue: [null],
      note: [null]
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let radiology = this.data.getRadiologyById(this.id);
      this.billNo = radiology.billNo;
      // this.f['applyTPA'].setValue(radiology.applyTPA);
      this.f['patientId'].setValue(radiology.patientId);
      this.f['prescriptionNo'].setValue(radiology.prescriptionNo);
      this.f['date'].setValue(radiology.date);
      this.f['referralDoctorId'].setValue(radiology.referralDoctorId);
      this.f['doctorName'].setValue(radiology.doctorName);
      this.f['totalAmount'].setValue(radiology.totalAmount);
      this.f['totalTax'].setValue(radiology.totalTax);
      this.f['discount'].setValue(radiology.discount);
      this.f['netAmount'].setValue(radiology.netAmount);
      this.f['paymentModeId'].setValue(radiology.paymentModeId);
      this.f['previousReportValue'].setValue(radiology.previousReportValue);
      this.f['note'].setValue(radiology.note);

      this.deleteTest(0);
      radiology.testInnerForm?.forEach((radiologyTest, index) => {
        radiologyTest.reportDate = parseDate(radiology.date);
        this.setTest(radiologyTest, index);
      });
      this.calculateTotalAmount();
    } else {
      this.billNo = this.data.getBillNo();
    }
  }

  private setFormData() {

  }

  get f() {
    return this.radiologyForm.controls;
  }

  get testInnerForm() {
    return this.radiologyForm.get('testInnerForm') as FormArray;
  }

  public onReferralDoctorChange() {
    this.f['doctorName'].setValue(null)
  }

  setTest(radiologyTest: RadiologyTest, index: number) {
    this.testInnerForm.push(this.fb.group({
      testId: [radiologyTest ? radiologyTest.testId : '', [Validators.required]],
      reportDays: [{ value: radiologyTest ? radiologyTest.reportDays : null, disabled: true }],
      reportDate: [{ value: radiologyTest ? this.getReportDate(radiologyTest.reportDate, radiologyTest.reportDays) : null, disabled: true }],
      amount: [{ value: radiologyTest ? radiologyTest.amount : null, disabled: true }],
      tax: [{ value: radiologyTest ? radiologyTest.tax : null, disabled: true }],
      radiologySampleCollected: [radiologyTest ? radiologyTest.radiologySampleCollected : null],
      radiologyApproveReport: [radiologyTest ? radiologyTest.radiologyApproveReport : null],
    }));
  }

  private getReportDate(date: Date, reportDays: number) {
    return this.datePipe.transform(this.addDays(date, reportDays), "dd-MMM-yyyy")
  }

  public onRadiologyTestChange(index: number) {
    let testId = this.testInnerForm.controls[index].get('testId')?.value;
    if (testId > 0) {
      let selectedTest = this.radiologyTest.find(x => x.id == testId);
      this.testInnerForm.controls[index].get('reportDays')?.setValue(selectedTest?.reportDays);
      this.testInnerForm.controls[index].get('reportDate')?.setValue(this.getReportDate(new Date(), selectedTest?.reportDays!));
      this.testInnerForm.controls[index].get('tax')?.setValue(selectedTest?.tax);
      this.testInnerForm.controls[index].get('amount')?.setValue(selectedTest?.amount);
    }
    else {
      this.testInnerForm.controls[index]?.get('reportDays')?.setValue(null);
      this.testInnerForm.controls[index]?.get('reportDate')?.setValue(null);
      this.testInnerForm.controls[index]?.get('tax')?.setValue(null);
      this.testInnerForm.controls[index]?.get('amount')?.setValue(null);
    }
    this.calculateTotalAmount();
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  addTest() {
    this.testInnerForm.push(this.fb.group({
      testId: ['', [Validators.required]],
      reportDays: [{ value: null, disabled: true }],
      reportDate: [{ value: null, disabled: true }],
      amount: [{ value: null, disabled: true }],
      tax: [{ value: null, disabled: true }]
    }));
  }

  deleteTest(index: number) {
    this.testInnerForm.removeAt(index);
    this.calculateTotalAmount();
  }

  searchByPrescriptionNo() {
    let prescriptionNo = this.f['prescriptionNo'].value;
    this.testInnerForm.clear();
    this.caseId = '';
    this.f['patientId'].setValue('');
    if (prescriptionNo) {
      let prescription = this.commonService.getPrescriptionByNo(prescriptionNo);
      if (prescription) {
        prescription.radiologyIds.forEach((test, index) => {
          this.testInnerForm.push(this.fb.group({
            testId: [test.id, [Validators.required]],
            reportDays: [{ value: null, disabled: true }],
            reportDate: [{ value: null, disabled: true }],
            amount: [{ value: null, disabled: true }],
            tax: [{ value: null, disabled: true }]
          }));
          this.onRadiologyTestChange(index);
        });
        let ipdPatient = this.commonService.getPatientByIpdPatientId(prescription.ipdPatientId);
        this.caseId = ipdPatient?.caseId;
        this.f['patientId'].setValue(ipdPatient?.patientId);
      }
      else {
        this.addTest();
      }
    } else {
      this.addTest();
    }
  }

  private calculateTotalAmount() {
    let totalAmount = 0;
    let totalTax = 0;
    this.testInnerForm.controls.forEach(element => {
      if (element.get('testId')?.value > 0) {
        totalAmount += element.get('amount')?.value;
        totalTax += element.get('tax')?.value;
      }
    });
    this.f['totalAmount'].setValue(totalAmount);
    this.f['totalTax'].setValue(totalTax);

    let discount = this.f['discount'].value;
    let amountAfterDiscount = this.round(totalAmount - (totalAmount * (discount / 100)), 2);
    let total = this.round((amountAfterDiscount + (amountAfterDiscount * (totalTax / 100))), 2);
    this.f['netAmount'].setValue(total);
  }

  onDiscountInputKeyup(event: any) {
    this.calculateTotalAmount();
  }

  round(num: number, fractionDigits: number): number {
    return Number(num.toFixed(fractionDigits));
  }

  onSubmit() {
    this.radiologyForm.markAllAsTouched();
    if (this.radiologyForm.valid) {
      const radiology: Radiology = this.radiologyForm.getRawValue();
      radiology.caseId = this.caseId;
      radiology.prescriptionNo = this.caseId ? radiology.prescriptionNo : '';
      radiology.billNo = this.billNo;
      if (this.isEdit) {
        radiology.id = this.id!;
        this.data.updateRadiology(radiology);
      }
      else {
        this.data.addRadiology(radiology);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Bill details has been updated successfully!' : 'Bill details has been added successfully!', 'Success!');
    }
  }
}
