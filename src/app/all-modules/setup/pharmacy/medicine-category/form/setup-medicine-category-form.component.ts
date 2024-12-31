import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PharmacySetupService } from '../../shared/services/pharmacy-setup.service';
import { Master_MedicineCategory } from '../../shared/models/master-medicine-category';

@Component({
  selector: 'app-setup-medicine-category-form',
  templateUrl: './setup-medicine-category-form.component.html',
  styleUrls: ['./setup-medicine-category-form.component.scss']
})
export class SetupMedicineCategoryFormComponent {
  medicineCategoryForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: PharmacySetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.medicineCategoryForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let medicineCategory = this.service.getMedicineCategory(this.id) as Master_MedicineCategory;
      this.f['name'].setValue(medicineCategory.name);
    }
  }

  get f() {
    return this.medicineCategoryForm.controls;
  }

  onSubmit() {
    this.medicineCategoryForm.markAllAsTouched();
    if (this.medicineCategoryForm.valid) {
      const medicineCategory: Master_MedicineCategory = this.medicineCategoryForm.getRawValue();
      if (this.isEdit) {
        medicineCategory.id = this.id!;
        this.service.updateMedicineCategory(medicineCategory);
      }
      else {
        medicineCategory.isActive = true;
        this.service.addMedicineCategory(medicineCategory);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Medicine category has been updated successfully!' : 'Medicine category has been added successfully!', 'Success!');
    }
  }
}
