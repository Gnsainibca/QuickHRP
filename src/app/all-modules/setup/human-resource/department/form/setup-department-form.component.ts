import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_Department } from '../../shared/models/master-department';
import { HumanResourceSetupService } from '../../shared/services/human-resource-setup.service';

@Component({
  selector: 'app-setup-department-form',
  templateUrl: './setup-department-form.component.html',
  styleUrls: ['./setup-department-form.component.scss']
})
export class SetupDepartmentFormComponent {
  departmentForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: HumanResourceSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.departmentForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let department = this.service.getDepartment(this.id) as Master_Department;
      this.f['name'].setValue(department.name);
    }
  }

  get f() {
    return this.departmentForm.controls;
  }

  onSubmit() {
    this.departmentForm.markAllAsTouched();
    if (this.departmentForm.valid) {
      const department: Master_Department = this.departmentForm.getRawValue();
      if (this.isEdit) {
        department.id = this.id!;
        this.service.updateDepartment(department);
      }
      else {
        department.isActive = true;
        this.service.addDepartment(department);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Department has been updated successfully!' : 'Department has been added successfully!', 'Success!');
    }
  }
}
