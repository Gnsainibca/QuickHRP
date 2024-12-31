import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from '../../shared/services/setting.service';
import { Master_MaritalStatus } from '../../shared/models/master-marital-status';

@Component({
  selector: 'app-setup-marital-status-form',
  templateUrl: './setup-marital-status-form.component.html',
  styleUrls: ['./setup-marital-status-form.component.scss']
})
export class SetupMaritalStatusFormComponent {
  maritalStatusForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: SettingService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.maritalStatusForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let maritalStatus = this.service.getMaritalStatus(this.id) as Master_MaritalStatus;
      this.f['name'].setValue(maritalStatus.name);
    }
  }

  get f() {
    return this.maritalStatusForm.controls;
  }

  onSubmit() {
    this.maritalStatusForm.markAllAsTouched();
    if (this.maritalStatusForm.valid) {
      const maritalStatus: Master_MaritalStatus = this.maritalStatusForm.getRawValue();
      if (this.isEdit) {
        maritalStatus.id = this.id!;
        this.service.updateMaritalStatus(maritalStatus);
      }
      else {
        maritalStatus.isActive = true;
        this.service.addMaritalStatus(maritalStatus);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Marital status has been updated successfully!' : 'Marital status has been added successfully!', 'Success!');
    }
  }
}
