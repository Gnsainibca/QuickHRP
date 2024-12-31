import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PharmacySetupService } from '../../shared/services/pharmacy-setup.service';
import { Master_MedicineDoseInterval } from '../../shared/models/master-medicine-dose-interval';

@Component({
  selector: 'app-setup-medicine-dose-interval-form',
  templateUrl: './setup-medicine-dose-interval-form.component.html',
  styleUrls: ['./setup-medicine-dose-interval-form.component.scss']
})
export class SetupMedicineDoseIntervalFormComponent {
  medicineDoseIntervalForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: PharmacySetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.medicineDoseIntervalForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let medicineDoseInterval = this.service.getMedicineDoseInterval(this.id) as Master_MedicineDoseInterval;
      this.f['name'].setValue(medicineDoseInterval.name);
    }
  }

  get f() {
    return this.medicineDoseIntervalForm.controls;
  }

  onSubmit() {
    this.medicineDoseIntervalForm.markAllAsTouched();
    if (this.medicineDoseIntervalForm.valid) {
      const medicineDoseInterval: Master_MedicineDoseInterval = this.medicineDoseIntervalForm.getRawValue();
      if (this.isEdit) {
        medicineDoseInterval.id = this.id!;
        this.service.updateMedicineDoseInterval(medicineDoseInterval);
      }
      else {
        medicineDoseInterval.isActive = true;
        this.service.addMedicineDoseInterval(medicineDoseInterval);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Medicine dose interval has been updated successfully!' : 'Medicine dose interval has been added successfully!', 'Success!');
    }
  }
}
