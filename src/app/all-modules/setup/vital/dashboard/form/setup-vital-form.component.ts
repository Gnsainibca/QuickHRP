import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_Vital } from '../../shared/models/master-vital';
import { VitalSetupService } from '../../shared/services/vital-setup.service';

@Component({
  selector: 'app-setup-vital-form',
  templateUrl: './setup-vital-form.component.html',
  styleUrls: ['./setup-vital-form.component.scss']
})
export class SetupVitalFormComponent {
  vitalForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: VitalSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.vitalForm = this.fb.group({
      name: [null, [Validators.required]],
      fromValue: [null, [Validators.required]],
      toValue: [null],
      unit: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let vital = this.service.getVital(this.id) as Master_Vital;
      this.f['name'].setValue(vital.name);
      this.f['fromValue'].setValue(vital.fromValue);
      this.f['toValue'].setValue(vital.toValue);
      this.f['unit'].setValue(vital.unit);
    }
  }

  get f() {
    return this.vitalForm.controls;
  }

  onSubmit() {
    this.vitalForm.markAllAsTouched();
    if (this.vitalForm.valid) {
      const vital: Master_Vital = this.vitalForm.getRawValue();
      if (this.isEdit) {
        vital.id = this.id!;
        this.service.updateVital(vital);
      }
      else {
        vital.isActive = true;
        this.service.addVital(vital);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Vital has been updated successfully!' : 'Vital has been added successfully!', 'Success!');
    }
  }
}
