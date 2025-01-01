import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientCharge, PatientCharge_Master } from 'src/app/all-modules/opd/shared/models/patient-charge';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Master_HospitalChargeType } from 'src/app/all-modules/setup/hospital-charge/shared/models/master_hospital-charge-type';
import { Master_HospitalChargeCategory } from 'src/app/all-modules/setup/hospital-charge/shared/models/master_hospital-charge-category';
import { Master_HospitalCharge } from 'src/app/all-modules/setup/hospital-charge/shared/models/master_hospital-charge';

@Component({
  selector: 'app-ipd-charge-form',
  templateUrl: './ipd-charge-form.component.html',
  styleUrls: ['./ipd-charge-form.component.scss']
})
export class IPDChargeFormComponent {
  chargeForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  @Input() ipdPatientId: number = 0;

  chargeTypeList: Array<Master_HospitalChargeType> = [];
  chargeCategoriesList: Array<Master_HospitalChargeCategory> = [];
  filteredChargeCategoriesList: Array<Master_HospitalChargeCategory> = [];
  chargeList: Array<Master_HospitalCharge> = [];
  filteredChargeList: Array<Master_HospitalCharge> = [];
  patientCharges: Array<PatientCharge> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService,
    private fb: FormBuilder, private service: OpdDataService, hospitalChargeSetupService: HospitalChargeSetupService) {
    this.chargeTypeList = hospitalChargeSetupService.getChargeTypes();
    this.chargeCategoriesList = hospitalChargeSetupService.getChargeCategories();
    this.chargeList = hospitalChargeSetupService.getHospitalCharges();
  }

  ngOnInit() {
    this.chargeForm = this.fb.group({
      opdPatientId: [this.ipdPatientId, [Validators.required]],
      date: [new Date(), [Validators.required]],
      applyTPA: [null],
      chargeTypeId: ['', [Validators.required]],
      chargeCategoryId: ['', [Validators.required]],
      chargeId: ['', [Validators.required]],
      standardCharge: [null],
      tpaCharge: [null],
      total: [0],
      discountPercentage: [0],
      tax: [0],
      netAmount: [0],
      quantity: [null, [Validators.required]],
      note: ['']
    });
    this.setFormControls();
    this.setControlsState();
  }

  private setFormControls() {
    if (this.isEdit) {
      let charge = this.service.getChargeById(this.id);
      this.f['opdPatientId'].setValue(charge.opdPatientId);
      this.f['date'].setValue(new Date(charge.date));
      this.f['applyTPA'].setValue(charge.applyTPA);
      this.f['chargeTypeId'].setValue(charge.chargeTypeId);
      this.onChargeTypeChange();
      this.f['chargeCategoryId'].setValue(charge.chargeCategoryId);
      this.onChargeCategoryChange();
      this.f['chargeId'].setValue(charge.chargeId);
      this.f['standardCharge'].setValue(charge.standardCharge);
      this.f['tpaCharge'].setValue(charge.tpaCharge);
      this.f['total'].setValue(charge.total);
      this.f['discountPercentage'].setValue(charge.discountPercentage);
      this.f['tax'].setValue(charge.tax);
      this.f['netAmount'].setValue(charge.netAmount);
      this.f['quantity'].setValue(charge.quantity);
      this.f['note'].setValue(charge.note);
    }
  }

  private setControlsState() {
    this.f['standardCharge']?.disable();
    this.f['tpaCharge']?.disable();
    this.f['total']?.disable();
    this.f['tax']?.disable();
    this.f['netAmount']?.disable();
  }

  onChargeTypeChange() {
    this.filteredChargeCategoriesList = this.chargeCategoriesList.filter(x => x.chargeTypeId == this.f['chargeTypeId'].value);
    this.resetChargeControls();
  }

  onChargeCategoryChange() {
    this.filteredChargeList = this.chargeList.filter(x => x.chargeCategoryId == this.f['chargeCategoryId'].value);
    this.resetChargeControls();
  }

  onChargeChange() {
    let charge = this.chargeList.find(x => x.chargeTypeId == this.f['chargeId'].value);
    this.resetChargeControls();
    this.f['standardCharge'].setValue(charge?.standardCharge);
    this.f['total'].setValue(charge?.standardCharge);
    this.f['tpaCharge'].setValue(charge?.tpaCharge);
    this.f['tax'].setValue(charge?.tax);
    this.calculateTotalAmount();
  }

  private resetChargeControls() {
    this.f['tax'].setValue(0);
    this.f['discountPercentage'].setValue(0);
    this.f['quantity'].setValue(1);
    this.f['standardCharge'].setValue(null);
    this.f['tpaCharge'].setValue(null);
    this.f['netAmount'].setValue(0);
    this.f['total'].setValue(0);
  }

  private calculateTotalAmount() {
    let discount = this.f['discountPercentage'].value;
    let tax = this.f['tax'].value;
    let appliedCharge = this.f['quantity'].value * this.f['standardCharge'].value;
    this.f['total'].setValue(appliedCharge);
    let amountAfterDiscount = appliedCharge - (appliedCharge * (discount / 100));
    let total = (amountAfterDiscount + (amountAfterDiscount * (tax / 100)));
    this.f['netAmount'].setValue(total);
  }

  onDiscountInputKeyup(event: any) {
    this.calculateTotalAmount();
  }

  onQuantityInputKeyup(event: any) {
    this.calculateTotalAmount();
  }

  get f() {
    return this.chargeForm.controls;
  }

  add() {
    this.chargeForm.markAllAsTouched();
    if (this.chargeForm.valid) {
      const patientCharge: PatientCharge = this.chargeForm.getRawValue();
      patientCharge.chargeType = this.chargeTypeList.find(x => x.id === patientCharge.chargeTypeId)?.name!;
      patientCharge.chargeCategory = this.chargeCategoriesList.find(x => x.id === patientCharge.chargeCategoryId)?.name!;
      patientCharge.charge = this.chargeList.find(x => x.id === patientCharge.chargeId)?.name!;
      this.patientCharges.push(patientCharge);
      this.ngOnInit();
    }
  }

  removeAt(index: number) {
    this.patientCharges.splice(index, 1);
  }

  save() {
    if (this.isEdit) {
      const patientCharge: PatientCharge = this.chargeForm.getRawValue();
      patientCharge.id = this.id!;
      this.service.updateCharge(patientCharge);
      this.onSave.next(true);
      this.toaster.typeSuccess('Charge details has been updated successfully!', 'Success!');
    }
    else {
      if (this.patientCharges?.length > 0) {
        this.service.addCharges(this.patientCharges);
        this.onSave.next(true);
        this.toaster.typeSuccess('Charge details has been added successfully!', 'Success!');
      } else {
        this.toaster.typeError('No data is to be added to the list!', 'Error!');
      }
    }
  }
}
