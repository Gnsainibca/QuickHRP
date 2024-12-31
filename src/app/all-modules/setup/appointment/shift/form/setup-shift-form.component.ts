import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentSetupService } from '../../shared/services/appointment-setup.service';
import { Master_Shift } from '../../shared/models/master-shift';

@Component({
  selector: 'app-setup-shift-form',
  templateUrl: './setup-shift-form.component.html',
  styleUrls: ['./setup-shift-form.component.scss']
})
export class SetupShiftFormComponent {
  shiftForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: AppointmentSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.shiftForm = this.fb.group({
      name: [null, [Validators.required]],
      timeFrom: [null, [Validators.required]],
      timeTo: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let shift = this.service.getShift(this.id) as Master_Shift;
      this.f['name'].setValue(shift.name);
      this.f['timeFrom'].setValue(shift.timeFrom);
      this.f['timeTo'].setValue(shift.timeTo);
    }
  }

  get f() {
    return this.shiftForm.controls;
  }

  onSubmit() {
    this.shiftForm.markAllAsTouched();
    if (this.shiftForm.valid) {
      const shift: Master_Shift = this.shiftForm.getRawValue();
      if (this.isEdit) {
        shift.id = this.id!;
        this.service.updateShift(shift);
      }
      else {
        shift.isActive = true;
        this.service.addShift(shift);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Shift has been updated successfully!' : 'Shift has been added successfully!', 'Success!');
    }
  }
}
