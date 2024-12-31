import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationSetupService } from '../../shared/services/operation-setup.service';
import { Master_OperationCategory } from '../../shared/models/master_operation-category';

@Component({
  selector: 'app-setup-operation-category-form',
  templateUrl: './setup-operation-category-form.component.html',
  styleUrls: ['./setup-operation-category-form.component.scss']
})
export class SetupOperationCategoryFormComponent {
  operationCategoryForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: OperationSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.operationCategoryForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let operationCategory = this.service.getOperationCategory(this.id) as Master_OperationCategory;
      this.f['name'].setValue(operationCategory.name);
    }
  }

  get f() {
    return this.operationCategoryForm.controls;
  }

  onSubmit() {
    this.operationCategoryForm.markAllAsTouched();
    if (this.operationCategoryForm.valid) {
      const operationCategory: Master_OperationCategory = this.operationCategoryForm.getRawValue();
      if (this.isEdit) {
        operationCategory.id = this.id!;
        this.service.updateOperationCategory(operationCategory);
      }
      else {
        operationCategory.isActive = true;
        this.service.addOperationCategory(operationCategory);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Operation category has been updated successfully!' : 'Operation category has been added successfully!', 'Success!');
    }
  }
}
