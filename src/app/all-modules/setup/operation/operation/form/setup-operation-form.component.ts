import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationSetupService } from '../../shared/services/operation-setup.service';
import { Master_OperationCategory } from '../../shared/models/master_operation-category';
import { Master_Operation } from '../../shared/models/master_operation';

@Component({
  selector: 'app-setup-operation-form',
  templateUrl: './setup-operation-form.component.html',
  styleUrls: ['./setup-operation-form.component.scss']
})
export class SetupOperationFormComponent {
  operationForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  operationCategories: Array<Master_OperationCategory> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, 
    private service: OperationSetupService) {
    this.operationCategories = service.getOperationCategoryList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.operationForm = this.fb.group({
      name: [null, [Validators.required]],
      operationCategoryId: ['', [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let operation = this.service.getOperation(this.id) as Master_Operation;
      this.f['name'].setValue(operation.name);
      this.f['operationCategoryId'].setValue(operation.operationCategoryId);
    }
  }

  get f() {
    return this.operationForm.controls;
  }

  onSubmit() {
    this.operationForm.markAllAsTouched();
    if (this.operationForm.valid) {
      const operation: Master_Operation = this.operationForm.getRawValue();
      if (this.isEdit) {
        operation.id = this.id!;
        this.service.updateOperation(operation);
      }
      else {
        operation.isActive = true;
        this.service.addOperation(operation);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Operation has been updated successfully!' : 'Operation has been added successfully!', 'Success!');
    }
  }
}
