import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_RadiologyCategory } from '../../shared/models/master-radiology-category';
import { RadiologySetupService } from '../../shared/services/radiology-setup.service';

@Component({
  selector: 'app-setup-radiology-category-form',
  templateUrl: './setup-radiology-category-form.component.html',
  styleUrls: ['./setup-radiology-category-form.component.scss']
})
export class SetupRadiologyCategoryFormComponent {
  radiologyCategoryForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: RadiologySetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.radiologyCategoryForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let radiologyCategory = this.service.getRadiologyCategory(this.id) as Master_RadiologyCategory;
      this.f['name'].setValue(radiologyCategory.name);
    }
  }

  get f() {
    return this.radiologyCategoryForm.controls;
  }

  onSubmit() {
    this.radiologyCategoryForm.markAllAsTouched();
    if (this.radiologyCategoryForm.valid) {
      const radiologyCategory: Master_RadiologyCategory = this.radiologyCategoryForm.getRawValue();
      if (this.isEdit) {
        radiologyCategory.id = this.id!;
        this.service.updateRadiologyCategory(radiologyCategory);
      }
      else {
        radiologyCategory.isActive = true;
        this.service.addRadiologyCategory(radiologyCategory);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Radiology category has been updated successfully!' : 'Radiology category has been added successfully!', 'Success!');
    }
  }
}
