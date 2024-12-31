import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentSetupService } from '../../shared/services/appointment-setup.service';
import { Master_AppointmentPriority } from '../../shared/models/master-appointment-priority';

@Component({
  selector: 'app-setup-appointment-priority-form',
  templateUrl: './setup-appointment-priority-form.component.html',
  styleUrls: ['./setup-appointment-priority-form.component.scss']
})
export class SetupAppointmentPriorityFormComponent {
  appointmentPriorityForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: AppointmentSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.appointmentPriorityForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let appointmentPriority = this.service.getAppointmentPriority(this.id) as Master_AppointmentPriority;
      this.f['name'].setValue(appointmentPriority.name);
    }
  }

  get f() {
    return this.appointmentPriorityForm.controls;
  }

  onSubmit() {
    this.appointmentPriorityForm.markAllAsTouched();
    if (this.appointmentPriorityForm.valid) {
      const appointmentPriority: Master_AppointmentPriority = this.appointmentPriorityForm.getRawValue();
      if (this.isEdit) {
        appointmentPriority.id = this.id!;
        this.service.updateAppointmentPriority(appointmentPriority);
      }
      else {
        appointmentPriority.isActive = true;
        this.service.addAppointmentPriority(appointmentPriority);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Appointment priority has been updated successfully!' : 'Appointment priority has been added successfully!', 'Success!');
    }
  }
}
