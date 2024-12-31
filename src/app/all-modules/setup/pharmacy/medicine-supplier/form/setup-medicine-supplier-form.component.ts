import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PharmacySetupService } from '../../shared/services/pharmacy-setup.service';
import { Master_MedicineSupplier } from '../../shared/models/master-medicine-supplier';

@Component({
  selector: 'app-setup-medicine-supplier-form',
  templateUrl: './setup-medicine-supplier-form.component.html',
  styleUrls: ['./setup-medicine-supplier-form.component.scss']
})
export class SetupMedicineSupplierFormComponent {
  medicineSupplierForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: PharmacySetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.medicineSupplierForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null],
      contactPersonName: [null],
      contactPersonPhone: [null],
      drugLicenseNo: [null],
      address: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let medicineSupplier = this.service.getMedicineSupplier(this.id) as Master_MedicineSupplier;
      this.f['name'].setValue(medicineSupplier.name);
      this.f['phone'].setValue(medicineSupplier.phone);
      this.f['contactPersonName'].setValue(medicineSupplier.contactPersonName);
      this.f['contactPersonPhone'].setValue(medicineSupplier.contactPersonPhone);
      this.f['drugLicenseNo'].setValue(medicineSupplier.drugLicenseNo);
      this.f['address'].setValue(medicineSupplier.address);
    }
  }

  get f() {
    return this.medicineSupplierForm.controls;
  }

  onSubmit() {
    this.medicineSupplierForm.markAllAsTouched();
    if (this.medicineSupplierForm.valid) {
      const medicineSupplier: Master_MedicineSupplier = this.medicineSupplierForm.getRawValue();
      if (this.isEdit) {
        medicineSupplier.id = this.id!;
        this.service.updateMedicineSupplier(medicineSupplier);
      }
      else {
        medicineSupplier.isActive = true;
        this.service.addMedicineSupplier(medicineSupplier);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Medicine supplier has been updated successfully!' : 'Medicine supplier has been added successfully!', 'Success!');
    }
  }
}
