import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PharmacySetupService } from '../../shared/services/pharmacy-setup.service';
import { Master_MedicineUnit } from '../../shared/models/master-medicine-unit';

@Component({
  selector: 'app-setup-medicine-unit-form',
  templateUrl: './setup-medicine-unit-form.component.html',
  styleUrls: ['./setup-medicine-unit-form.component.scss']
})
export class SetupMedicineUnitFormComponent {
  medicineUnitForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: PharmacySetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.medicineUnitForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let medicineUnit = this.service.getMedicineUnit(this.id) as Master_MedicineUnit;
      this.f['name'].setValue(medicineUnit.name);
    }
  }

  get f() {
    return this.medicineUnitForm.controls;
  }

  onSubmit() {
    this.medicineUnitForm.markAllAsTouched();
    if (this.medicineUnitForm.valid) {
      const medicineUnit: Master_MedicineUnit = this.medicineUnitForm.getRawValue();
      if (this.isEdit) {
        medicineUnit.id = this.id!;
        this.service.updateMedicineUnit(medicineUnit);
      }
      else {
        medicineUnit.isActive = true;
        this.service.addMedicineUnit(medicineUnit);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Medicine unit has been updated successfully!' : 'Medicine unit has been added successfully!', 'Success!');
    }
  }
}
