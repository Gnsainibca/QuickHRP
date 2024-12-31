import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord, SimpleRecordWithCharge } from 'src/app/shared/models/simple-record';
import { RadiologyDataService } from '../../shared/services/radiology-data.service';
import { RadiologyTest } from '../../shared/models/radiology';
import { RadiologyTestParameter } from '../../shared/models/radiology-test-parameter';
import { CommonService } from 'src/app/shared/data/common.service';
import { RadiologySetupService } from 'src/app/all-modules/setup/radiology/shared/services/radiology-setup.service';
import { Master_RadiologyParameterList } from 'src/app/all-modules/setup/radiology/shared/models/master-radiology-parameter';
import { Master_RadiologyCategory } from 'src/app/all-modules/setup/radiology/shared/models/master-radiology-category';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Charge_Module } from 'src/app/shared/enums/charge-module';

@Component({
  selector: 'radiology-test-form',
  templateUrl: './radiology-test-form.component.html',
  styleUrls: ['./radiology-test-form.component.scss']
})
export class RadiologyTestFormComponent {
  radiologyTestForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  date: Date = new Date();
  patients: Array<SimpleRecord> = [];
  radiologyTest: Array<RadiologyTest> = [];
  radiologyCategoryList: Array<Master_RadiologyCategory> = [];
  radiologyParameterList: Array<Master_RadiologyParameterList> = [];
  radiologyChargeCategoryList: Array<SimpleRecord> = [];
  radiologyChargeList: Array<SimpleRecordWithCharge> = [];
  filteredRadiologyChargeList: Array<SimpleRecordWithCharge> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private datePipe: DatePipe,
    private data: RadiologyDataService, private commonService : CommonService,
      radiologySetupService : RadiologySetupService, hospitalChargeSetupService : HospitalChargeSetupService) {
    this.radiologyCategoryList = radiologySetupService.getRadiologyCategoryList();
    this.radiologyParameterList = radiologySetupService.getRadiologyParameterList();
    this.radiologyChargeCategoryList = hospitalChargeSetupService.getChargeCategoriesByModuleId(Charge_Module.Radiology);
    this.radiologyChargeList = hospitalChargeSetupService.getChargesByChargeCategoriesId(this.radiologyChargeCategoryList.map(x=> x.id));
    this.patients = this.commonService.getPatientNameList();
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
    this.radiologyTest = this.data.getRadiologyTests().sort((a, b) => b.id - a.id);
  }

  initializerForm() {
    this.radiologyTestForm = this.fb.group({
      name: ['', [Validators.required]],
      shortName: [null, [Validators.required]],
      type: [null],
      categoryId: ['', [Validators.required]],
      subCategory: [null],
      reportDays: [null, [Validators.required]],
      chargeCategoryId: ['', [Validators.required]],
      chargeId: ['', [Validators.required]],
      amount: [{ value: null, disabled: true }],
      tax: [{ value: null, disabled: true }],
      testParameterInnerForm: this.fb.array(
        [
          this.fb.group(
            {
              testParameterId: ['', [Validators.required]],
              referenceRange: [{ value: null, disabled: true }],
              unit: [{ value: null, disabled: true }]
            }
          )
        ]
      )
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let radiologyTest = this.data.getRadiologyTestById(this.id);
      this.f['name'].setValue(radiologyTest.name);
      this.f['shortName'].setValue(radiologyTest.shortName);
      this.f['type'].setValue(radiologyTest.type);
      this.f['categoryId'].setValue(radiologyTest.categoryId);
      this.f['subCategory'].setValue(radiologyTest.subCategory);
      this.f['reportDays'].setValue(radiologyTest.reportDays);
      this.f['chargeCategoryId'].setValue(radiologyTest.chargeCategoryId);
      this.onChargeCategoryChange();
      this.f['chargeId'].setValue(radiologyTest.chargeId);
      this.f['amount'].setValue(radiologyTest.amount);
      this.f['tax'].setValue(radiologyTest.tax);

      this.deleteTest(0);
      radiologyTest.testParameterInnerForm?.forEach((radiologyTest, index) => {
        this.setTest(radiologyTest, index);
      });
    }
  }

  setTest(radiologyTest: RadiologyTestParameter, index: number) {
    this.testParameterInnerForm.push(this.fb.group({
      testParameterId: [radiologyTest ? radiologyTest.testParameterId : '', [Validators.required]],
      referenceRange: [{ value: radiologyTest ? radiologyTest.referenceRange : null, disabled: true }],
      unit: [{ value: radiologyTest ? radiologyTest.unit : null, disabled: true }]
    }));
  }

  private setFormData() {

  }

  get f() {
    return this.radiologyTestForm.controls;
  }

  get testParameterInnerForm() {
    return this.radiologyTestForm.get('testParameterInnerForm') as FormArray;
  }

  public onChargeCategoryChange() {
    this.f['amount'].setValue(null);
    this.f['tax'].setValue(null);
    this.f['chargeId'].setValue('');
    const selectedChargeCategotyId = this.f['chargeCategoryId'].value;
    this.filteredRadiologyChargeList = this.radiologyChargeList.filter(x => x.parentId == selectedChargeCategotyId);
  }

  public onChargeChange() {
    const selectedChargeId = this.f['chargeId'].value;
    let charge = this.radiologyChargeList.find(x => x.id == selectedChargeId);
    this.f['amount'].setValue(charge?.amount);
    this.f['tax'].setValue(charge?.tax);
  }

  public onTestParameterChange(index: number) {
    let testParameterId = this.testParameterInnerForm.controls[index].get('testParameterId')?.value;
    let selectedTest = this.radiologyParameterList.find(x => x.id == testParameterId);
    this.testParameterInnerForm.controls[index].get('referenceRange')?.setValue(selectedTest?.referenceRange);
    this.testParameterInnerForm.controls[index].get('unit')?.setValue(selectedTest?.radiologyUnit);
  }

  addTest() {
    this.testParameterInnerForm.push(this.fb.group({
      testParameterId: ['', [Validators.required]],
      referenceRange: [{ value: null, disabled: true }],
      unit: [{ value: null, disabled: true }]
    }));
  }

  deleteTest(index: number) {
    this.testParameterInnerForm.removeAt(index);
  }

  onSubmit() {
    this.radiologyTestForm.markAllAsTouched();
    if (this.radiologyTestForm.valid) {
      const radiologyTest: RadiologyTest = this.radiologyTestForm.getRawValue();
      if (this.isEdit) {
        radiologyTest.id = this.id!;
        this.data.updateRadiologyTest(radiologyTest);
      }
      else {
        this.data.addRadiologyTest(radiologyTest);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Radiology test has been updated successfully!' : 'Radiology test has been added successfully!', 'Success!');
    }
  }
}
