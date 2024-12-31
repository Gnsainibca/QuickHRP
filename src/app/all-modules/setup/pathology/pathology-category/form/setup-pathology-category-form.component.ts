import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_PathologyCategory } from '../../shared/models/master-pathology-category';
import { PathologySetupService } from '../../shared/services/pathology-setup.service';

@Component({
  selector: 'app-setup-pathology-category-form',
  templateUrl: './setup-pathology-category-form.component.html',
  styleUrls: ['./setup-pathology-category-form.component.scss']
})
export class SetupPathologyCategoryFormComponent {
  pathologyCategoryForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: PathologySetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.pathologyCategoryForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let pathologyCategory = this.service.getPathologyCategory(this.id) as Master_PathologyCategory;
      this.f['name'].setValue(pathologyCategory.name);
    }
  }

  get f() {
    return this.pathologyCategoryForm.controls;
  }

  onSubmit() {
    this.pathologyCategoryForm.markAllAsTouched();
    if (this.pathologyCategoryForm.valid) {
      const pathologyCategory: Master_PathologyCategory = this.pathologyCategoryForm.getRawValue();
      if (this.isEdit) {
        pathologyCategory.id = this.id!;
        this.service.updatePathologyCategory(pathologyCategory);
      }
      else {
        pathologyCategory.isActive = true;
        this.service.addPathologyCategory(pathologyCategory);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Pathology category has been updated successfully!' : 'Pathology category has been added successfully!', 'Success!');
    }
  }
}
