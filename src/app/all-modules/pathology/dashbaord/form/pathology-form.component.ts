import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PathologyDataService } from '../../shared/services/pathology-data.service';
import { Pathology, PathologyTest } from '../../shared/models/pathology';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { parseDate } from 'ngx-bootstrap/chronos';
import { CommonService } from 'src/app/shared/data/common.service';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Master_PaymentMode } from 'src/app/all-modules/setup/hospital-charge/shared/models/master_payment-mode';

@Component({
  selector: 'pathology-form',
  templateUrl: './pathology-form.component.html',
  styleUrls: ['./pathology-form.component.scss']
})
export class PathologyFormComponent {
  pathologyForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  date: Date = new Date();
  patients: Array<SimpleRecord> = [];
  pathologyTest: Array<PathologyTest> = [];
  doctors: Array<SimpleRecord> = [];
  paymentModes: Array<Master_PaymentMode> = [];
  billNo: string = '';
  caseId : string = '';

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private datePipe: DatePipe,
    private service: PathologyDataService, private commonService : CommonService, 
    hospitalChargeSetupService : HospitalChargeSetupService) {
    this.doctors = this.commonService.getDoctorsNameList();
    this.paymentModes = hospitalChargeSetupService.getPaymentModeList();
    this.patients = this.commonService.getPatientNameList();
  }

  ngOnInit() {
    this.initializerForm();
    this.pathologyTest = this.service.getPathologyTests().sort((a, b) => b.id - a.id);
  }

  initializerForm() {
    this.pathologyForm = this.fb.group({
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
      let pathology = this.service.getPathologyById(this.id);
      this.billNo = pathology.billNo;
      // this.f['applyTPA'].setValue(pathology.applyTPA);
      this.f['patientId'].setValue(pathology.patientId);
      this.f['prescriptionNo'].setValue(pathology.prescriptionNo);
      this.f['date'].setValue(pathology.date);
      this.f['referralDoctorId'].setValue(pathology.referralDoctorId);
      this.f['doctorName'].setValue(pathology.doctorName);
      this.f['totalAmount'].setValue(pathology.totalAmount);
      this.f['totalTax'].setValue(pathology.totalTax);
      this.f['discount'].setValue(pathology.discount);
      this.f['netAmount'].setValue(pathology.netAmount);
      this.f['paymentModeId'].setValue(pathology.paymentModeId);
      this.f['previousReportValue'].setValue(pathology.previousReportValue);
      this.f['note'].setValue(pathology.note);

      this.deleteTest(0);
      pathology.testInnerForm?.forEach((pathologyTest, index) => {
        pathologyTest.reportDate = parseDate(pathology.date);
        this.setTest(pathologyTest, index);
      });
      this.calculateTotalAmount();
    } else {
      this.billNo = this.service.getBillNo();
    }
  }

  get f() {
    return this.pathologyForm.controls;
  }

  get testInnerForm() {
    return this.pathologyForm.get('testInnerForm') as FormArray;
  }

  public onReferralDoctorChange() {
    this.f['doctorName'].setValue(null)
  }

  setTest(pathologyTest: PathologyTest, index: number) {
    this.testInnerForm.push(this.fb.group({
      testId: [pathologyTest ? pathologyTest.testId : '', [Validators.required]],
      reportDays: [{ value: pathologyTest ? pathologyTest.reportDays : null, disabled: true }],
      reportDate: [{ value: pathologyTest ? this.getReportDate(pathologyTest.reportDate, pathologyTest.reportDays) : null, disabled: true }],
      amount: [{ value: pathologyTest ? pathologyTest.amount : null, disabled: true }],
      tax: [{ value: pathologyTest ? pathologyTest.tax : null, disabled: true }],
      sampleCollected: [pathologyTest ? pathologyTest.sampleCollected : null],
      approveReport: [pathologyTest ? pathologyTest.approveReport : null],
    }));
  }

  private getReportDate(date: Date, reportDays: number) {
    return this.datePipe.transform(this.addDays(date, reportDays), "dd-MMM-yyyy")
  }

  public onPathologyTestChange(index: number) {
    let testId = this.testInnerForm.controls[index].get('testId')?.value;
    if (testId > 0) {
      let selectedTest = this.pathologyTest.find(x => x.id == testId);
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
        prescription.pathologyIds.forEach((test, index) => {
          this.testInnerForm.push(this.fb.group({
            testId: [test.id, [Validators.required]],
            reportDays: [{ value: null, disabled: true }],
            reportDate: [{ value: null, disabled: true }],
            amount: [{ value: null, disabled: true }],
            tax: [{ value: null, disabled: true }]
          }));
          this.onPathologyTestChange(index);
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
    this.pathologyForm.markAllAsTouched();
    if (this.pathologyForm.valid) {
      const pathology: Pathology = this.pathologyForm.getRawValue();
      pathology.caseId = this.caseId;
      pathology.prescriptionNo = this.caseId ? pathology.prescriptionNo : '';
      pathology.billNo = this.billNo;
      if (this.isEdit) {
        pathology.id = this.id!;
        this.service.updatePathology(pathology);
      }
      else {
        this.service.addPathology(pathology);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Bill details has been updated successfully!' : 'Bill details has been added successfully!', 'Success!');
    }
  }
}
