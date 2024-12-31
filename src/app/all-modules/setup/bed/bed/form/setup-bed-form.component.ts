import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_BedType } from '../../shared/models/master-bed-type';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { BedSetupService } from '../../shared/services/bed-setup.service';
import { Master_Bed } from '../../shared/models/master-bed';

@Component({
  selector: 'app-setup-bed-form',
  templateUrl: './setup-bed-form.component.html',
  styleUrls: ['./setup-bed-form.component.scss']
})
export class SetupBedFormComponent {
  bedForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  bedTypes: Array<Master_BedType> = [];
  bedGroups: Array<SimpleRecord> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: BedSetupService) {
    this.bedTypes = service.getBedTypeList();
    this.bedGroups = service.getBedGroupNameList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.bedForm = this.fb.group({
      name: [null, [Validators.required]],
      bedTypeId: ['', [Validators.required]],
      bedGroupId: ['', [Validators.required]],
      isAvailable: [true],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let chargeCategory = this.service.getBed(this.id) as Master_Bed;
      this.f['name'].setValue(chargeCategory.name);
      this.f['bedTypeId'].setValue(chargeCategory.bedTypeId);
      this.f['bedGroupId'].setValue(chargeCategory.bedGroupId);
      this.f['isAvailable'].setValue(chargeCategory.isAvailable);
    }
  }

  get f() {
    return this.bedForm.controls;
  }

  onSubmit() {
    this.bedForm.markAllAsTouched();
    if (this.bedForm.valid) {
      const bed: Master_Bed = this.bedForm.getRawValue();
      if (this.isEdit) {
        bed.id = this.id!;
        this.service.updateBed(bed);
      }
      else {
        bed.isActive = true;
        this.service.addBed(bed);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Bed has been updated successfully!' : 'Bed has been added successfully!', 'Success!');
    }
  }
}
