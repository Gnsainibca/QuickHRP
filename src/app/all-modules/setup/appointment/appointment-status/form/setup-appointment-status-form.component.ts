import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentSetupService } from '../../shared/services/appointment-setup.service';
import { Master_AppointmentStatus } from '../../shared/models/master-appointment-status';

@Component({
  selector: 'app-setup-appointment-status-form',
  templateUrl: './setup-appointment-status-form.component.html',
  styleUrls: ['./setup-appointment-status-form.component.scss']
})
export class SetupAppointmentStatusFormComponent {
  appointmentStatusForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: AppointmentSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.appointmentStatusForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let appointmentStatus = this.service.getAppointmentStatus(this.id) as Master_AppointmentStatus;
      this.f['name'].setValue(appointmentStatus.name);
    }
  }

  get f() {
    return this.appointmentStatusForm.controls;
  }

  onSubmit() {
    this.appointmentStatusForm.markAllAsTouched();
    if (this.appointmentStatusForm.valid) {
      const appointmentStatus: Master_AppointmentStatus = this.appointmentStatusForm.getRawValue();
      if (this.isEdit) {
        appointmentStatus.id = this.id!;
        this.service.updateAppointmentStatus(appointmentStatus);
      }
      else {
        appointmentStatus.isActive = true;
        this.service.addAppointmentStatus(appointmentStatus);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Appointment status has been updated successfully!' : 'Appointment status has been added successfully!', 'Success!');
    }
  }
}
