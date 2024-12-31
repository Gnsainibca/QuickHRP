import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { HospitalChargeSetupService } from '../../shared/services/hospital-charge-setup.service';
import { Master_HospitalCharge } from '../../shared/models/master_hospital-charge';
import { Master_HospitalChargeType } from '../../shared/models/master_hospital-charge-type';
import { Master_HospitalChargeTaxCategory } from '../../shared/models/master_hospital-charge-tax-category';
import { Master_HospitalChargeUnitType } from '../../shared/models/master_hospital-charge-unit-type';
import { Master_HospitalChargeCategory } from '../../shared/models/master_hospital-charge-category';

@Component({
  selector: 'app-setup-hospital-charge-form',
  templateUrl: './setup-hospital-charge-form.component.html',
  styleUrls: ['./setup-hospital-charge-form.component.scss']
})
export class SetupHospitalChargeFormComponent {
  hospitalChargeForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  chargeTypes: Array<Master_HospitalChargeType> = [];
  chargeCategories: Array<Master_HospitalChargeCategory> = [];
  filteredChargeCategories: Array<Master_HospitalChargeCategory> = [];
  unitTypes: Array<Master_HospitalChargeUnitType> = [];
  taxCategories: Array<Master_HospitalChargeTaxCategory> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: HospitalChargeSetupService) {
    this.chargeTypes = service.list(APP_CONSTANT.localStorage.key.master_chargeTypes) as Array<Master_HospitalChargeType>;
    this.chargeCategories = service.list(APP_CONSTANT.localStorage.key.master_chargeCategories) as Array<Master_HospitalChargeCategory>;
    this.unitTypes = service.list(APP_CONSTANT.localStorage.key.master_unitTypes) as Array<Master_HospitalChargeUnitType>;
    this.taxCategories = service.list(APP_CONSTANT.localStorage.key.master_taxCategories) as Array<Master_HospitalChargeTaxCategory>;
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.hospitalChargeForm = this.fb.group({
      name: [null, [Validators.required]],
      chargeTypeId: ['', [Validators.required]],
      chargeCategoryId: ['', [Validators.required]],
      unitTypeId: ['', [Validators.required]],
      taxCategoryId: ['', [Validators.required]],
      tax: [{value : null, disabled : true}],
      standardCharge: [null, [Validators.required]],
      description: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let chargeCategory = this.service.getHospitalCharge(this.id) as Master_HospitalCharge;
      this.f['name'].setValue(chargeCategory.name);
      this.f['chargeTypeId'].setValue(chargeCategory.chargeTypeId);
      this.onChargeTypeChange();
      this.f['chargeCategoryId'].setValue(chargeCategory.chargeCategoryId);
      this.f['unitTypeId'].setValue(chargeCategory.unitTypeId);
      this.f['taxCategoryId'].setValue(chargeCategory.taxCategoryId);
      this.onTaxCategoryChange();
      this.f['standardCharge'].setValue(chargeCategory.standardCharge);
      this.f['description'].setValue(chargeCategory.description);
    }
  }

  get f() {
    return this.hospitalChargeForm.controls;
  }

  onChargeTypeChange() {
    this.filteredChargeCategories = this.chargeCategories.filter(x => x.chargeTypeId == this.f['chargeTypeId'].value);
  }

  onTaxCategoryChange() {
    const tax = this.taxCategories.find(x => x.id == this.f['taxCategoryId'].value)?.tax;
    this.f['tax'].setValue(tax ? tax : null);
  }

  onSubmit() {
    this.hospitalChargeForm.markAllAsTouched();
    if (this.hospitalChargeForm.valid) {
      const chargeCategory: Master_HospitalCharge = this.hospitalChargeForm.getRawValue();
      if (this.isEdit) {
        chargeCategory.id = this.id!;
        this.service.updateHospitalCharge(chargeCategory);
      }
      else {
        chargeCategory.isActive = true;
        this.service.addHospitalCharge(chargeCategory);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Charge has been updated successfully!' : 'Charge has been added successfully!', 'Success!');
    }
  }
}
