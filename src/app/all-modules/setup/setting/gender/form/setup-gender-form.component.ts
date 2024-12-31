import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_Gender } from '../../shared/models/master-gender';
import { SettingService } from '../../shared/services/setting.service';

@Component({
  selector: 'app-setup-gender-form',
  templateUrl: './setup-gender-form.component.html',
  styleUrls: ['./setup-gender-form.component.scss']
})
export class SetupGenderFormComponent {
  genderForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: SettingService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.genderForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let gender = this.service.getGender(this.id) as Master_Gender;
      this.f['name'].setValue(gender.name);
    }
  }

  get f() {
    return this.genderForm.controls;
  }

  onSubmit() {
    this.genderForm.markAllAsTouched();
    if (this.genderForm.valid) {
      const gender: Master_Gender = this.genderForm.getRawValue();
      if (this.isEdit) {
        gender.id = this.id!;
        this.service.updateGender(gender);
      }
      else {
        gender.isActive = true;
        this.service.addGender(gender);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Gender has been updated successfully!' : 'Gender has been added successfully!', 'Success!');
    }
  }
}
