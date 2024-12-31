import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PathologyDataService } from '../../shared/services/pathology-data.service';
import { PathologyTest } from '../../shared/models/pathology';
import { SimpleRecord, SimpleRecordWithCharge } from 'src/app/shared/models/simple-record';
import { PathologyTestParameter } from '../../shared/models/pathology-test-parameter';
import { CommonService } from 'src/app/shared/data/common.service';
import { PathologySetupService } from 'src/app/all-modules/setup/pathology/shared/services/pathology-setup.service';
import { Master_PathologyParameterList } from 'src/app/all-modules/setup/pathology/shared/models/master-pathology-parameter';
import { Master_PathologyCategory } from 'src/app/all-modules/setup/pathology/shared/models/master-pathology-category';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Charge_Module } from 'src/app/shared/enums/charge-module';

@Component({
  selector: 'pathology-test-form',
  templateUrl: './pathology-test-form.component.html',
  styleUrls: ['./pathology-test-form.component.scss']
})
export class PathologyTestFormComponent {
  pathologyTestForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  date: Date = new Date();
  patients: Array<SimpleRecord> = [];
  pathologyTest: Array<PathologyTest> = [];
  pathologyCategoryList: Array<Master_PathologyCategory> = [];
  pathologyParameterList: Array<Master_PathologyParameterList> = [];
  pathologyChargeCategoryList: Array<SimpleRecord> = [];
  pathologyChargeList: Array<SimpleRecordWithCharge> = [];
  filteredPathologyChargeList: Array<SimpleRecordWithCharge> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private datePipe: DatePipe,
    private data: PathologyDataService, private commonService : CommonService,
    pathologySetupService : PathologySetupService, hospitalChargeSetupService : HospitalChargeSetupService
  ) {
    this.pathologyCategoryList = pathologySetupService.getPathologyCategoryList();
    this.pathologyParameterList = pathologySetupService.getPathologyParameterList();
    this.pathologyChargeCategoryList = hospitalChargeSetupService.getChargeCategoriesByModuleId(Charge_Module.Pathology);
    this.pathologyChargeList = hospitalChargeSetupService.getChargesByChargeCategoriesId(this.pathologyChargeCategoryList.map(x=> x.id));
    this.patients = this.commonService.getPatientNameList();
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
    this.pathologyTest = this.data.getPathologyTests().sort((a, b) => b.id - a.id);
  }

  initializerForm() {
    this.pathologyTestForm = this.fb.group({
      name: ['', [Validators.required]],
      shortName: [null, [Validators.required]],
      type: [null],
      categoryId: ['', [Validators.required]],
      subCategory: [null],
      method: [null],
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
    let pathologyTest!: PathologyTest;
    if (this.isEdit) {
      pathologyTest = this.data.getPathologyTestById(this.id);
      this.f['name'].setValue(pathologyTest.name);
      this.f['shortName'].setValue(pathologyTest.shortName);
      this.f['type'].setValue(pathologyTest.type);
      this.f['categoryId'].setValue(pathologyTest.categoryId);
      this.f['subCategory'].setValue(pathologyTest.subCategory);
      this.f['method'].setValue(pathologyTest.method);
      this.f['reportDays'].setValue(pathologyTest.reportDays);
      this.f['chargeCategoryId'].setValue(pathologyTest.chargeCategoryId);
      this.onChargeCategoryChange();
      this.f['chargeId'].setValue(pathologyTest.chargeId);
      this.f['amount'].setValue(pathologyTest.amount);
      this.f['tax'].setValue(pathologyTest.tax);

      this.deleteTest(0);
      pathologyTest.testParameterInnerForm?.forEach((pathologyTest, index) => {
        this.setTest(pathologyTest, index);
      });
    }
  }

  setTest(pathologyTest: PathologyTestParameter, index: number) {
    this.testParameterInnerForm.push(this.fb.group({
      testParameterId: [pathologyTest ? pathologyTest.testParameterId : '', [Validators.required]],
      referenceRange: [{ value: pathologyTest ? pathologyTest.referenceRange : null, disabled: true }],
      unit: [{ value: pathologyTest ? pathologyTest.unit : null, disabled: true }]
    }));
  }

  private setFormData() {

  }

  get f() {
    return this.pathologyTestForm.controls;
  }

  get testParameterInnerForm() {
    return this.pathologyTestForm.get('testParameterInnerForm') as FormArray;
  }

  public onChargeCategoryChange() {
    this.f['amount'].setValue(null);
    this.f['tax'].setValue(null);
    this.f['chargeId'].setValue('');
    const selectedChargeCategotyId = this.f['chargeCategoryId'].value;
    this.filteredPathologyChargeList = this.pathologyChargeList.filter(x => x.parentId == selectedChargeCategotyId);
  }

  public onChargeChange() {
    const selectedChargeId = this.f['chargeId'].value;
    let charge = this.pathologyChargeList.find(x => x.id == selectedChargeId);
    this.f['amount'].setValue(charge?.amount);
    this.f['tax'].setValue(charge?.tax);
  }

  public onTestParameterChange(index: number) {
    let testParameterId = this.testParameterInnerForm.controls[index].get('testParameterId')?.value;
    let selectedTest = this.pathologyParameterList.find(x => x.id == testParameterId);
    this.testParameterInnerForm.controls[index].get('referenceRange')?.setValue(selectedTest?.referenceRange);
    this.testParameterInnerForm.controls[index].get('unit')?.setValue(selectedTest?.pathologyUnit);
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
    this.pathologyTestForm.markAllAsTouched();
    if (this.pathologyTestForm.valid) {
      const pathologyTest: PathologyTest = this.pathologyTestForm.getRawValue();
      if (this.isEdit) {
        pathologyTest.id = this.id!;
        this.data.updatePathologyTest(pathologyTest);
      }
      else {
        this.data.addPathologyTest(pathologyTest);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Pathology test has been updated successfully!' : 'Pathology test has been added successfully!', 'Success!');
    }
  }
}
