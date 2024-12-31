import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_Designation } from '../../shared/models/master-designation';
import { HumanResourceSetupService } from '../../shared/services/human-resource-setup.service';

@Component({
  selector: 'app-setup-designation-form',
  templateUrl: './setup-designation-form.component.html',
  styleUrls: ['./setup-designation-form.component.scss']
})
export class SetupDesignationFormComponent {
  designationForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: HumanResourceSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.designationForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let designation = this.service.getDesignation(this.id) as Master_Designation;
      this.f['name'].setValue(designation.name);
    }
  }

  get f() {
    return this.designationForm.controls;
  }

  onSubmit() {
    this.designationForm.markAllAsTouched();
    if (this.designationForm.valid) {
      const designation: Master_Designation = this.designationForm.getRawValue();
      if (this.isEdit) {
        designation.id = this.id!;
        this.service.updateDesignation(designation);
      }
      else {
        designation.isActive = true;
        this.service.addDesignation(designation);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Designation has been updated successfully!' : 'Designation has been added successfully!', 'Success!');
    }
  }
}
