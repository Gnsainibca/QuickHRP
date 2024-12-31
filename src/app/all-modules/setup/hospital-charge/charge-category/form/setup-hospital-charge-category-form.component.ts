import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HospitalChargeSetupService } from '../../shared/services/hospital-charge-setup.service';
import { Master_HospitalChargeType } from '../../shared/models/master_hospital-charge-type';
import { Master_HospitalChargeCategory } from '../../shared/models/master_hospital-charge-category';

@Component({
  selector: 'app-setup-hospital-charge-category-form',
  templateUrl: './setup-hospital-charge-category-form.component.html',
  styleUrls: ['./setup-hospital-charge-category-form.component.scss']
})
export class SetupHospitalChargeCategoryFormComponent {
  chargeCategoryForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  chargeTypes: Array<Master_HospitalChargeType> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: HospitalChargeSetupService) {
    this.chargeTypes = service.getChargeTypes();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.chargeCategoryForm = this.fb.group({
      name: [null, [Validators.required]],
      chargeTypeId: ['', [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let chargeCategory = this.service.getChargeCategory(this.id) as Master_HospitalChargeCategory;
      this.f['name'].setValue(chargeCategory.name);
      this.f['chargeTypeId'].setValue(chargeCategory.chargeTypeId);
      this.f['description'].setValue(chargeCategory.description);
    }
  }

  get f() {
    return this.chargeCategoryForm.controls;
  }

  onSubmit() {
    this.chargeCategoryForm.markAllAsTouched();
    if (this.chargeCategoryForm.valid) {
      const chargeCategory: Master_HospitalChargeCategory = this.chargeCategoryForm.getRawValue();
      if (this.isEdit) {
        chargeCategory.id = this.id!;
        this.service.updateChargeCategory(chargeCategory);
      }
      else {
        chargeCategory.isActive = true;
        this.service.addChargeCategory(chargeCategory);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Charge category has been updated successfully!' : 'Charge category has been added successfully!', 'Success!');
    }
  }
}
