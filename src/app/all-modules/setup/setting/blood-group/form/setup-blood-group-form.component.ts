import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from '../../shared/services/setting.service';
import { Master_BloodGroup } from '../../shared/models/master-blood-group';

@Component({
  selector: 'app-setup-blood-group-form',
  templateUrl: './setup-blood-group-form.component.html',
  styleUrls: ['./setup-blood-group-form.component.scss']
})
export class SetupBloodGroupFormComponent {
  bloodGroupForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: SettingService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.bloodGroupForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let bloodGroup = this.service.getBloodGroup(this.id) as Master_BloodGroup;
      this.f['name'].setValue(bloodGroup.name);
    }
  }

  get f() {
    return this.bloodGroupForm.controls;
  }

  onSubmit() {
    this.bloodGroupForm.markAllAsTouched();
    if (this.bloodGroupForm.valid) {
      const bloodGroup: Master_BloodGroup = this.bloodGroupForm.getRawValue();
      if (this.isEdit) {
        bloodGroup.id = this.id!;
        this.service.updateBloodGroup(bloodGroup);
      }
      else {
        bloodGroup.isActive = true;
        this.service.addBloodGroup(bloodGroup);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Blood group has been updated successfully!' : 'Blood group has been added successfully!', 'Success!');
    }
  }
}
