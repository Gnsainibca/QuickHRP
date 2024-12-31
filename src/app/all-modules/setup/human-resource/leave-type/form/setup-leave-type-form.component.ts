import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_LeaveType } from '../../shared/models/master-leave-type';
import { HumanResourceSetupService } from '../../shared/services/human-resource-setup.service';

@Component({
  selector: 'app-setup-leave-type-form',
  templateUrl: './setup-leave-type-form.component.html',
  styleUrls: ['./setup-leave-type-form.component.scss']
})
export class SetupLeaveTypeFormComponent {
  leaveTypeForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: HumanResourceSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.leaveTypeForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let leaveType = this.service.getLeaveType(this.id) as Master_LeaveType;
      this.f['name'].setValue(leaveType.name);
    }
  }

  get f() {
    return this.leaveTypeForm.controls;
  }

  onSubmit() {
    this.leaveTypeForm.markAllAsTouched();
    if (this.leaveTypeForm.valid) {
      const leaveType: Master_LeaveType = this.leaveTypeForm.getRawValue();
      if (this.isEdit) {
        leaveType.id = this.id!;
        this.service.updateLeaveType(leaveType);
      }
      else {
        leaveType.isActive = true;
        this.service.addLeaveType(leaveType);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'LeaveType has been updated successfully!' : 'LeaveType has been added successfully!', 'Success!');
    }
  }
}
