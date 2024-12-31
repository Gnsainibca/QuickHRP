import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_Purpose } from '../../shared/models/master-purpose';
import { FrontOfficeSetupService } from '../../shared/services/front-office-setup.service';

@Component({
  selector: 'app-setup-purpose-form',
  templateUrl: './setup-purpose-form.component.html',
  styleUrls: ['./setup-purpose-form.component.scss']
})
export class SetupPurposeFormComponent {
  purposeForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: FrontOfficeSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.purposeForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let purpose = this.service.getPurpose(this.id) as Master_Purpose;
      this.f['name'].setValue(purpose.name);
      this.f['description'].setValue(purpose.description);
    }
  }

  get f() {
    return this.purposeForm.controls;
  }

  onSubmit() {
    this.purposeForm.markAllAsTouched();
    if (this.purposeForm.valid) {
      const purpose: Master_Purpose = this.purposeForm.getRawValue();
      if (this.isEdit) {
        purpose.id = this.id!;
        this.service.updatePurpose(purpose);
      }
      else {
        purpose.isActive = true;
        this.service.addPurpose(purpose);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Purpose has been updated successfully!' : 'Purpose has been added successfully!', 'Success!');
    }
  }
}
