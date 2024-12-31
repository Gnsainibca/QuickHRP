import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_RadiologyUnit } from '../../shared/models/master-radiology-unit';
import { RadiologySetupService } from '../../shared/services/radiology-setup.service';

@Component({
  selector: 'app-setup-radiology-unit-form',
  templateUrl: './setup-radiology-unit-form.component.html',
  styleUrls: ['./setup-radiology-unit-form.component.scss']
})
export class SetupRadiologyUnitFormComponent {
  radiologyUnitForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: RadiologySetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.radiologyUnitForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let radiologyUnit = this.service.getRadiologyUnit(this.id) as Master_RadiologyUnit;
      this.f['name'].setValue(radiologyUnit.name);
    }
  }

  get f() {
    return this.radiologyUnitForm.controls;
  }

  onSubmit() {
    this.radiologyUnitForm.markAllAsTouched();
    if (this.radiologyUnitForm.valid) {
      const radiologyUnit: Master_RadiologyUnit = this.radiologyUnitForm.getRawValue();
      if (this.isEdit) {
        radiologyUnit.id = this.id!;
        this.service.updateRadiologyUnit(radiologyUnit);
      }
      else {
        radiologyUnit.isActive = true;
        this.service.addRadiologyUnit(radiologyUnit);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Radiology unit has been updated successfully!' : 'Radiology unit has been added successfully!', 'Success!');
    }
  }
}
