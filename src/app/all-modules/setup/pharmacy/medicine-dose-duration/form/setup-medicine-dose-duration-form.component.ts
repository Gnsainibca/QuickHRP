import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PharmacySetupService } from '../../shared/services/pharmacy-setup.service';
import { Master_MedicineDoseDuration } from '../../shared/models/master-medicine-dose-duration';

@Component({
  selector: 'app-setup-medicine-dose-duration-form',
  templateUrl: './setup-medicine-dose-duration-form.component.html',
  styleUrls: ['./setup-medicine-dose-duration-form.component.scss']
})
export class SetupMedicineDoseDurationFormComponent {
  medicineDoseDurationForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: PharmacySetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.medicineDoseDurationForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let medicineDoseDuration = this.service.getMedicineDoseDuration(this.id) as Master_MedicineDoseDuration;
      this.f['name'].setValue(medicineDoseDuration.name);
    }
  }

  get f() {
    return this.medicineDoseDurationForm.controls;
  }

  onSubmit() {
    this.medicineDoseDurationForm.markAllAsTouched();
    if (this.medicineDoseDurationForm.valid) {
      const medicineDoseDuration: Master_MedicineDoseDuration = this.medicineDoseDurationForm.getRawValue();
      if (this.isEdit) {
        medicineDoseDuration.id = this.id!;
        this.service.updateMedicineDoseDuration(medicineDoseDuration);
      }
      else {
        medicineDoseDuration.isActive = true;
        this.service.addMedicineDoseDuration(medicineDoseDuration);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Medicine dose duration has been updated successfully!' : 'Medicine dose duration has been added successfully!', 'Success!');
    }
  }
}
