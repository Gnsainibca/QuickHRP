import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FrontOfficeSetupService } from '../../shared/services/front-office-setup.service';
import { Master_ComplainType } from '../../shared/models/master-complain-type';

@Component({
  selector: 'app-setup-complain-form-type',
  templateUrl: './setup-complain-type-form.component.html',
  styleUrls: ['./setup-complain-type-form.component.scss']
})
export class SetupComplainTypeFormComponent {
  complainTypeForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: FrontOfficeSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.complainTypeForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let complainType = this.service.getComplainType(this.id) as Master_ComplainType;
      this.f['name'].setValue(complainType.name);
      this.f['description'].setValue(complainType.description);
    }
  }

  get f() {
    return this.complainTypeForm.controls;
  }

  onSubmit() {
    this.complainTypeForm.markAllAsTouched();
    if (this.complainTypeForm.valid) {
      const complainType: Master_ComplainType = this.complainTypeForm.getRawValue();
      if (this.isEdit) {
        complainType.id = this.id!;
        this.service.updateComplainType(complainType);
      }
      else {
        complainType.isActive = true;
        this.service.addComplainType(complainType);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Complain Type has been updated successfully!' : 'Complain Type has been added successfully!', 'Success!');
    }
  }
}
