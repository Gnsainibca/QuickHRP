import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pharmacy, PurchaseMedicineDetails } from '../../shared/models/pharmacy';
import { SimpleRecord, SimpleRecordWithParent } from 'src/app/shared/models/simple-record';
import { CommonService } from 'src/app/shared/data/common.service';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Master_PaymentMode } from 'src/app/all-modules/setup/hospital-charge/shared/models/master_payment-mode';

@Component({
  selector: 'pharmacy-form',
  templateUrl: './pharmacy-form.component.html',
  styleUrls: ['./pharmacy-form.component.scss']
})
export class PharmacyFormComponent {
  pharmacyForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  date: Date = new Date();
  patients: Array<SimpleRecord> = [];
  pharmacyMedicines?: Array<SimpleRecordWithParent>;
  medicineCategories?: Array<SimpleRecord>;
  doctors: Array<SimpleRecord> = [];
  paymentModes: Array<Master_PaymentMode> = [];
  batchesInfo: Array<any> = [];
  billNo: string = '';

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder,
    private data: PharmacyService, private commonService: CommonService, hospitalChargeSetupService : HospitalChargeSetupService) {
    this.doctors = this.commonService.getDoctorsNameList();
    this.paymentModes = hospitalChargeSetupService.getPaymentModeList();
    this.patients = this.commonService.getPatientNameList();
    this.pharmacyMedicines = data.getMedicineNameList();
    this.medicineCategories = data.getMedicineCategoryNameList();
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    this.pharmacyForm = this.fb.group({
      patientId: ['', [Validators.required]],
      prescriptionNo: [null],
      caseId: [null],
      date: [this.date],
      medicineInnerForm: this.fb.array(
        [
          this.fb.group(
            {
              categoryId: ['', [Validators.required]],
              medicineId: ['', [Validators.required]],
              batchNo: ['', [Validators.required]],
              expiryDate: [null, [Validators.required]],
              quantity: [null, [Validators.required]],
              salePrice: [null, [Validators.required]],
              tax: [null, [Validators.required]],
              amount: [null, [Validators.required]],
              filteredPharmacyMedicines: [null],
              filteredBatches: [null]
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
      paymentAmount: [null],
      note: [null]
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let pharmacy = this.data.getPharmacies().find(x => x.id == this.id)!;
      this.billNo = pharmacy.billNo;
      // this.f['applyTPA'].setValue(pharmacy.applyTPA);
      this.f['patientId'].setValue(pharmacy.patientId);
      this.f['prescriptionNo'].setValue(pharmacy.prescriptionNo);
      this.f['caseId'].setValue(pharmacy.caseId);
      this.f['date'].setValue(pharmacy.date);
      this.f['referralDoctorId'].setValue(pharmacy.referralDoctorId);
      this.f['doctorName'].setValue(pharmacy.doctorName);
      this.f['totalAmount'].setValue(pharmacy.totalAmount);
      this.f['totalTax'].setValue(pharmacy.totalTax);
      this.f['discount'].setValue(pharmacy.discount);
      this.f['netAmount'].setValue(pharmacy.netAmount);
      this.f['paymentModeId'].setValue(pharmacy.paymentModeId);
      this.f['paymentAmount'].setValue(pharmacy.paymentAmount);
      this.f['note'].setValue(pharmacy.note);

      this.deleteMedicine(0);
      pharmacy.medicineInnerForm?.forEach((pharmacyMedicine, index) => {
        this.setMedicine(pharmacyMedicine, index);
      });
      this.calculateTotalAmount();
    } else {
      this.billNo = this.data.getBillNo();
    }
  }

  private setFormData() {

  }

  get f() {
    return this.pharmacyForm.controls;
  }

  get medicineInnerForm() {
    return this.pharmacyForm.get('medicineInnerForm') as FormArray;
  }

  public onReferralDoctorChange() {
    this.f['doctorName'].setValue(null)
  }

  setMedicine(purchaseMedicine: PurchaseMedicineDetails, index: number) {
    this.medicineInnerForm.push(this.fb.group({
      categoryId: [purchaseMedicine?.categoryId],
      medicineId: [purchaseMedicine?.medicineId],
      batchNo: [purchaseMedicine?.batchNo],
      expiryDate: [purchaseMedicine?.expiryDate],
      salePrice: [purchaseMedicine?.salePrice],
      quantity: [purchaseMedicine?.quantity],
      tax: [purchaseMedicine?.tax],
      amount: [purchaseMedicine?.amount],
      filteredPharmacyMedicines: [null],
      filteredBatches: [null]
    }));
    this.onCategoryChange(index);
    this.onMedicineChange(index);
    this.onBatchChange(index);
  }

  addMedicine() {
    this.medicineInnerForm.push(this.fb.group({
      categoryId: ['', [Validators.required]],
      medicineId: ['', [Validators.required]],
      batchId: ['', [Validators.required]],
      expiryDate: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      salePrice: [null, [Validators.required]],
      tax: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      filteredPharmacyMedicines: [null],
      filteredBatches: [null]
    }));
  }

  deleteMedicine(index: number) {
    this.medicineInnerForm.removeAt(index);
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    let totalAmount = 0;
    let totalTax = 0;
    let totalQuantity = 0;
    this.medicineInnerForm.controls.forEach(element => {
      totalAmount += element.get('salePrice')?.value;
      totalQuantity += element.get('quantity')?.value;
      totalTax += element.get('tax')?.value;
      element.get('amount')?.setValue(element.get('salePrice')?.value * element.get('quantity')?.value);
    });
    let totalAmountWithQty = totalAmount * totalQuantity;
    this.f['totalAmount'].setValue(totalAmountWithQty);
    this.f['totalTax'].setValue(totalTax);

    let discount = this.f['discount'].value;
    let amountAfterDiscount = this.round(totalAmountWithQty - (totalAmountWithQty * (discount / 100)), 2);
    let total = this.round((amountAfterDiscount + (amountAfterDiscount * (totalTax / 100))), 2);
    this.f['netAmount'].setValue(total);
    this.f['paymentAmount'].setValue(total);
  }

  round(num: number, fractionDigits: number): number {
    return Number(num.toFixed(fractionDigits));
  }

  onDiscountInputKeyup(event: any) {
    this.calculateTotalAmount();
  }

  onCategoryChange(index: number) {
    let selectedItem = this.medicineInnerForm.controls[index].get('categoryId')?.value;
    let filteredPharmacyMedicines: Array<SimpleRecordWithParent> = [];
    if (selectedItem) {
      filteredPharmacyMedicines = this.pharmacyMedicines?.filter(x => x.parentId == selectedItem)!;
    }
    this.medicineInnerForm.controls[index].get('filteredPharmacyMedicines')?.setValue(filteredPharmacyMedicines);
  }

  onMedicineChange(index: number) {
    let selectedItem = this.medicineInnerForm.controls[index].get('medicineId')?.value;
    let filteredBatches: Array<SimpleRecordWithParent> = [];
    if (selectedItem) {
      filteredBatches = this.data.getBatcheNoByMedicineId(selectedItem);
    }
    this.medicineInnerForm.controls[index].get('filteredBatches')?.setValue(filteredBatches);
  }

  onBatchChange(index: number) {
    let selectedBatch = this.medicineInnerForm.controls[index].get('batchNo')?.value;
    let batchInfo = (this.medicineInnerForm.controls[index].get('filteredBatches')?.value as Array<any>)?.find(x => x.batchNo == selectedBatch);
    this.medicineInnerForm.controls[index].get('expiryDate')?.setValue(batchInfo.expiryDate);
    this.medicineInnerForm.controls[index].get('salePrice')?.setValue(batchInfo.salePrice);
    this.medicineInnerForm.controls[index].get('tax')?.setValue(batchInfo.tax);
    this.medicineInnerForm.controls[index].get('amount')?.setValue(batchInfo.amount);
  }

  onSubmit() {
    this.pharmacyForm.markAllAsTouched();
    if (this.pharmacyForm.valid) {
      const pharmacy: Pharmacy = this.pharmacyForm.getRawValue();
      pharmacy.billNo = this.billNo;
      if (this.isEdit) {
        pharmacy.id = this.id!;
        this.data.updatePharmacy(pharmacy);
      }
      else {
        this.data.addPharmacy(pharmacy);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Bill details has been updated successfully!' : 'Bill details has been added successfully!', 'Success!');
    }
  }
}
