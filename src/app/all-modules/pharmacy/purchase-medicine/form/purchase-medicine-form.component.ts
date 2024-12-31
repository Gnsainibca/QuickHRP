import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseMedicine, PurchaseMedicineDetails } from '../../shared/models/pharmacy';
import { SimpleRecord, SimpleRecordWithParent } from 'src/app/shared/models/simple-record';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { ImageViewerModalContent } from 'src/app/shared/components/image-view/image-viewer-modal.component';
import { PharmacySetupService } from 'src/app/all-modules/setup/pharmacy/shared/services/pharmacy-setup.service';
import { Master_MedicineSupplier } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-supplier';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Master_PaymentMode } from 'src/app/all-modules/setup/hospital-charge/shared/models/master_payment-mode';

@Component({
  selector: 'purchase-medicine-form',
  templateUrl: './purchase-medicine-form.component.html',
  styleUrls: ['./purchase-medicine-form.component.scss']
})
export class PurchaseMedicineFormComponent {
  purchaseMedicineForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  date: Date = new Date();
  pharmacyMedicines?: Array<SimpleRecordWithParent>;
  medicineCategories?: Array<SimpleRecord>;
  suppliers?: Array<Master_MedicineSupplier>;
  paymentModes: Array<Master_PaymentMode> = [];
  billNo: string = '';

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder,
    private data: PharmacyService, pharmacySetupService: PharmacySetupService, private modalService: NgbModal,
    hospitalChargeSetupService : HospitalChargeSetupService) {
    this.paymentModes = hospitalChargeSetupService.getPaymentModeList();
    this.pharmacyMedicines = data.getMedicineNameList();
    this.medicineCategories = data.getMedicineCategoryNameList();
    this.suppliers = pharmacySetupService.getMedicineSupplierList();
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    this.purchaseMedicineForm = this.fb.group({
      purchaseDate: [this.date],
      supplierId: ['', [Validators.required]],
      billNo: [null, [Validators.required]],
      medicineInnerForm: this.fb.array(
        [
          this.fb.group(
            {
              categoryId: ['', [Validators.required]],
              medicineId: ['', [Validators.required]],
              batchNo: [null, [Validators.required]],
              expiryDate: [null, [Validators.required]],
              mrp: [null, [Validators.required]],
              batchAmount: [null],
              salePrice: [null, [Validators.required]],
              packingQuantity: [null, [Validators.required]],
              quantity: [null, [Validators.required]],
              purchasePrice: [null, [Validators.required]],
              tax: [null, [Validators.required]],
              amount: [{ value: null, disabled: true }],
              filteredPharmacyMedicines : [null]
            }
          )
        ]
      ),
      totalAmount: [0],
      totalTax: [0],
      discount: [0],
      netAmount: [0],
      paymentModeId: ['', [Validators.required]],
      paymentAmount: [{ value: null, disabled: true }],
      note: [null],
      image: [null],
      imageName: [null],
      paymentNote: [null]
    });
    this.setFormControls();
  }

  private setFormControls() {
    let purchaseMedicine!: PurchaseMedicine;
    if (this.isEdit) {
      purchaseMedicine = this.data.getPurchaseMedicineById(this.id!)!;
      this.billNo = purchaseMedicine.billNo;
      this.f['purchaseDate'].setValue(purchaseMedicine.purchaseDate);
      this.f['supplierId'].setValue(purchaseMedicine.supplierId);
      this.f['billNo'].setValue(purchaseMedicine.billNo);
      this.f['totalAmount'].setValue(purchaseMedicine.totalAmount);
      this.f['totalTax'].setValue(purchaseMedicine.totalTax);
      this.f['discount'].setValue(purchaseMedicine.discount);
      this.f['netAmount'].setValue(purchaseMedicine.netAmount);
      this.f['paymentModeId'].setValue(purchaseMedicine.paymentModeId);
      this.f['paymentAmount'].setValue(purchaseMedicine.paymentAmount);
      this.f['note'].setValue(purchaseMedicine.note);
      this.f['image'].setValue(purchaseMedicine.image);
      this.f['imageName'].setValue(purchaseMedicine.imageName);
      this.f['paymentNote'].setValue(purchaseMedicine.paymentNote);

      this.deleteMedicine(0);
      purchaseMedicine.medicineInnerForm?.forEach((purchaseMedicine, index) => {
        this.setMedicine(purchaseMedicine, index);
      });
      this.calculateTotalAmount();
    } else {
      this.billNo = this.data.getPurchaseMedicineBillNo();
      this.f['billNo'].setValue(this.billNo);
    }
  }

  private setFormData() {

  }

  get f() {
    return this.purchaseMedicineForm.controls;
  }

  get medicineInnerForm() {
    return this.purchaseMedicineForm.get('medicineInnerForm') as FormArray;
  }

  setMedicine(purchaseMedicine: PurchaseMedicineDetails, index: number) {
    this.medicineInnerForm.push(this.fb.group({
      categoryId: [purchaseMedicine?.categoryId],
      medicineId: [purchaseMedicine?.medicineId],
      batchNo: [purchaseMedicine?.batchNo],
      expiryDate: [purchaseMedicine?.expiryDate],
      mrp: [purchaseMedicine?.mrp],
      batchAmount: [purchaseMedicine?.batchAmount],
      salePrice: [purchaseMedicine?.salePrice],
      packingQuantity: [purchaseMedicine?.packingQuantity],
      quantity: [purchaseMedicine?.quantity],
      purchasePrice: [purchaseMedicine?.purchasePrice],
      tax: [purchaseMedicine?.tax],
      amount: [purchaseMedicine?.amount],
      filteredPharmacyMedicines : [null]
    }));
    this.onCategoryChange(index);
  }

  onCategoryChange(index: number) {
    let selectedItem = this.medicineInnerForm.controls[index].get('categoryId')?.value;
    let filteredPharmacyMedicines : Array<SimpleRecordWithParent> = [];
    if (selectedItem) {
      filteredPharmacyMedicines = this.pharmacyMedicines?.filter(x => x.parentId == selectedItem)!;
    }
    this.medicineInnerForm.controls[index].get('filteredPharmacyMedicines')?.setValue(filteredPharmacyMedicines);
  }

  addMedicine() {
    this.medicineInnerForm.push(this.fb.group({
      categoryId: ['', [Validators.required]],
      medicineId: ['', [Validators.required]],
      batchNo: [null, [Validators.required]],
      expiryDate: [null, [Validators.required]],
      mrp: [null, [Validators.required]],
      batchAmount: [null],
      salePrice: [null, [Validators.required]],
      packingQuantity: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      purchasePrice: [null, [Validators.required]],
      tax: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      filteredPharmacyMedicines : [null]
    }));
  }

  deleteMedicine(index: number) {
    this.medicineInnerForm.removeAt(index);
    this.calculateTotalAmount();
  }

  public calculateTotalAmount() {
    let totalAmount = 0;
    let totalTax = 0;
    let totalQuantity = 0;
    this.medicineInnerForm.controls.forEach(element => {
      totalAmount += element.get('purchasePrice')?.value;
      totalQuantity += element.get('quantity')?.value;
      totalTax += element.get('tax')?.value;
      element.get('amount')?.setValue(element.get('purchasePrice')?.value * element.get('quantity')?.value);
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

  handlePurchaseMedicineImageInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.f['imageName'].setValue(file.name);
    reader.onload = () => {
      this.f['image'].setValue(reader.result);
    };
  }

  downloadPurchaseMedicineImage() {
    const downloadLink = document.createElement('a');
    const fileName = this.f['imageName'].value;
    downloadLink.href = this.f['image'].value;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  viewImage() {
    const modalRef = this.modalService.open(ImageViewerModalContent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.data = this.f['image'].value;
    modalRef.componentInstance.name = this.f['imageName'].value;
  }

  onSubmit() {
    this.purchaseMedicineForm.markAllAsTouched();
    if (this.purchaseMedicineForm.valid) {
      let purchaseMedicine: PurchaseMedicine = this.purchaseMedicineForm.getRawValue();
      purchaseMedicine.billNo = this.billNo;
      if (this.isEdit) {
        purchaseMedicine.id = this.id!;
        this.data.updatePurchaseMedicine(purchaseMedicine);
      }
      else {
        this.data.addPurchaseMedicine(purchaseMedicine);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Purchase medicine details has been updated successfully!' : 'Purchase medicine details has been added successfully!', 'Success!');
    }
  }
}
