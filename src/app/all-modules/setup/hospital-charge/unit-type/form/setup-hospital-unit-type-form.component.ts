import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HospitalChargeSetupService } from '../../shared/services/hospital-charge-setup.service';
import { Master_HospitalChargeUnitType } from '../../shared/models/master_hospital-charge-unit-type';

@Component({
  selector: 'app-setup-hospital-unit-type-form',
  templateUrl: './setup-hospital-unit-type-form.component.html',
  styleUrls: ['./setup-hospital-unit-type-form.component.scss']
})
export class SetupHospitalUnitTypeFormComponent {
  unitTypeForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: HospitalChargeSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.unitTypeForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let unitType = this.service.getUnitType(this.id) as Master_HospitalChargeUnitType;
      this.f['name'].setValue(unitType.name);
    }
  }

  get f() {
    return this.unitTypeForm.controls;
  }

  onSubmit() {
    this.unitTypeForm.markAllAsTouched();
    if (this.unitTypeForm.valid) {
      const unitType: Master_HospitalChargeUnitType = this.unitTypeForm.getRawValue();
      if (this.isEdit) {
        unitType.id = this.id!;
        this.service.updateUnitType(unitType);
      }
      else {
        unitType.isActive = true;
        this.service.addUnitType(unitType);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Unit type has been updated successfully!' : 'Unit type has been added successfully!', 'Success!');
    }
  }
}
