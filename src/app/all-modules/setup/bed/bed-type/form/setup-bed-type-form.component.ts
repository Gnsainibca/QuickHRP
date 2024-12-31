import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BedSetupService } from '../../shared/services/bed-setup.service';
import { Master_BedType } from '../../shared/models/master-bed-type';

@Component({
  selector: 'app-setup-bed-type-form',
  templateUrl: './setup-bed-type-form.component.html',
  styleUrls: ['./setup-bed-type-form.component.scss']
})
export class SetupBedTypeFormComponent {
  bedTypeForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: BedSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.bedTypeForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let bedType = this.service.getBedType(this.id);
      this.f['name'].setValue(bedType.name);
    }
  }

  get f() {
    return this.bedTypeForm.controls;
  }

  onSubmit() {
    this.bedTypeForm.markAllAsTouched();
    if (this.bedTypeForm.valid) {
      const bedType: Master_BedType = this.bedTypeForm.getRawValue();
      if (this.isEdit) {
        bedType.id = this.id!;
        this.service.updateBedType(bedType);
      }
      else {
        bedType.isActive = true;
        this.service.addBedType(bedType);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Bed type has been updated successfully!' : 'Bed type has been added successfully!', 'Success!');
    }
  }
}
