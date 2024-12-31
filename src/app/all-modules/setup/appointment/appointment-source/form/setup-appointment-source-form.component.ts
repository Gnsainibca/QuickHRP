import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentSetupService } from '../../shared/services/appointment-setup.service';
import { Master_AppointmentSource } from '../../shared/models/master-appointment-source';

@Component({
  selector: 'app-setup-appointment-source-form',
  templateUrl: './setup-appointment-source-form.component.html',
  styleUrls: ['./setup-appointment-source-form.component.scss']
})
export class SetupAppointmentSourceFormComponent {
  appointmentSourceForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: AppointmentSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.appointmentSourceForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let appointmentSource = this.service.getAppointmentSource(this.id) as Master_AppointmentSource;
      this.f['name'].setValue(appointmentSource.name);
    }
  }

  get f() {
    return this.appointmentSourceForm.controls;
  }

  onSubmit() {
    this.appointmentSourceForm.markAllAsTouched();
    if (this.appointmentSourceForm.valid) {
      const appointmentSource: Master_AppointmentSource = this.appointmentSourceForm.getRawValue();
      if (this.isEdit) {
        appointmentSource.id = this.id!;
        this.service.updateAppointmentSource(appointmentSource);
      }
      else {
        appointmentSource.isActive = true;
        this.service.addAppointmentSource(appointmentSource);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Appointment source has been updated successfully!' : 'Appointment source has been added successfully!', 'Success!');
    }
  }
}
