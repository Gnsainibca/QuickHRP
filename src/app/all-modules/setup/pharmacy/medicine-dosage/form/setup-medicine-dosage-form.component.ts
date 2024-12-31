import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PharmacySetupService } from '../../shared/services/pharmacy-setup.service';
import { Master_MedicineDosage } from '../../shared/models/master-medicine-dosage';
import { Master_MedicineCategory } from '../../shared/models/master-medicine-category';
import { Master_MedicineUnit } from '../../shared/models/master-medicine-unit';

@Component({
  selector: 'app-setup-medicine-dosage-form',
  templateUrl: './setup-medicine-dosage-form.component.html',
  styleUrls: ['./setup-medicine-dosage-form.component.scss']
})
export class SetupMedicineDosageFormComponent {
  medicineDosageForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  medicineCategories: Array<Master_MedicineCategory> = [];
  medicineUnits: Array<Master_MedicineUnit> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: PharmacySetupService) {
    this.medicineCategories = service.getMedicineCategoryList();
    this.medicineUnits = service.getMedicineUnitList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.medicineDosageForm = this.fb.group({
      medicineCategoryId: ['', [Validators.required]],
      name: [null, [Validators.required]],
      medicineUnitId: ['', [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let medicineDosage = this.service.getMedicineDosage(this.id) as Master_MedicineDosage;
      this.f['medicineCategoryId'].setValue(medicineDosage.medicineCategoryId);
      this.f['name'].setValue(medicineDosage.name);
      this.f['medicineUnitId'].setValue(medicineDosage.medicineUnitId);
    }
  }

  get f() {
    return this.medicineDosageForm.controls;
  }

  onSubmit() {
    this.medicineDosageForm.markAllAsTouched();
    if (this.medicineDosageForm.valid) {
      const medicineDosage: Master_MedicineDosage = this.medicineDosageForm.getRawValue();
      if (this.isEdit) {
        medicineDosage.id = this.id!;
        this.service.updateMedicineDosage(medicineDosage);
      }
      else {
        medicineDosage.isActive = true;
        this.service.addMedicineDosage(medicineDosage);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Medicine dosage has been updated successfully!' : 'Medicine dosage has been added successfully!', 'Success!');
    }
  }
}
