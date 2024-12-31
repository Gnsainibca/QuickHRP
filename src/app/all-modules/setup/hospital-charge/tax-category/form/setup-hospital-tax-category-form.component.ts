import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HospitalChargeSetupService } from '../../shared/services/hospital-charge-setup.service';
import { Master_HospitalChargeTaxCategory } from '../../shared/models/master_hospital-charge-tax-category';

@Component({
  selector: 'app-setup-hospital-tax-category-form',
  templateUrl: './setup-hospital-tax-category-form.component.html',
  styleUrls: ['./setup-hospital-tax-category-form.component.scss']
})
export class SetupHospitalTaxCategoryFormComponent {
  taxCategoryForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: HospitalChargeSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.taxCategoryForm = this.fb.group({
      name: [null, [Validators.required]],
      tax: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let taxCategory = this.service.getTaxCategory(this.id) as Master_HospitalChargeTaxCategory;
      this.f['name'].setValue(taxCategory.name);
      this.f['tax'].setValue(taxCategory.tax);
    }
  }

  get f() {
    return this.taxCategoryForm.controls;
  }

  onSubmit() {
    this.taxCategoryForm.markAllAsTouched();
    if (this.taxCategoryForm.valid) {
      const taxCategory: Master_HospitalChargeTaxCategory = this.taxCategoryForm.getRawValue();
      if (this.isEdit) {
        taxCategory.id = this.id!;
        this.service.updateTaxCategory(taxCategory);
      }
      else {
        taxCategory.isActive = true;
        this.service.addTaxCategory(taxCategory);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Tax category has been updated successfully!' : 'Tax category has been added successfully!', 'Success!');
    }
  }
}
