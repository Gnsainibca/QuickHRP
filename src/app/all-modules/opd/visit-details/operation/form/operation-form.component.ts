import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OpdDataService } from '../../../shared/services/opd.service';
import { Operation } from '../../../shared/models/operation';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { CommonService } from 'src/app/shared/data/common.service';
import { OperationSetupService } from 'src/app/all-modules/setup/operation/shared/services/operation-setup.service';
import { Master_OperationCategory } from 'src/app/all-modules/setup/operation/shared/models/master_operation-category';
import { Master_OperationList } from 'src/app/all-modules/setup/operation/shared/models/master_operation';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss']
})
export class OperationFormComponent {
  operationForm!: UntypedFormGroup;
  operationCategories: Array<Master_OperationCategory> = [];
  operations: Array<Master_OperationList> = [];
  filteredOperations: Array<Master_OperationList> = [];
  doctors: Array<SimpleRecord> = [];
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Input() opdPatientId: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private data: OpdDataService,
    private commonService: CommonService, private operationSetupService: OperationSetupService
  ) {
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    this.operationForm = this.fb.group({
      operationCategoryId: ['', [Validators.required]],
      opdPatientId: [this.opdPatientId, [Validators.required]],
      operationId: ['', [Validators.required]],
      operationDate: [null, [Validators.required]],
      doctorId: ['', [Validators.required]],
      assistantConsultant1: [null],
      assistantConsultant2: [null],
      anesthetist: [null],
      anesthesiaType: [null],
      otTechnician: [null],
      otAssistant: [null],
      remarks: [null],
      result: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let operation = this.data.getOperationById(this.id);
      this.f['operationCategoryId'].setValue(operation.operationCategoryId);
      this.onOperationCategoryChange();
      this.f['operationId'].setValue(operation.operationId);
      this.f['operationDate'].setValue(operation.operationDate);
      this.f['doctorId'].setValue(operation.doctorId);
      this.f['assistantConsultant1'].setValue(operation.assistantConsultant1);
      this.f['assistantConsultant2'].setValue(operation.assistantConsultant2);
      this.f['anesthetist'].setValue(operation.anesthetist);
      this.f['anesthesiaType'].setValue(operation.anesthesiaType);
      this.f['otTechnician'].setValue(operation.otTechnician);
      this.f['otAssistant'].setValue(operation.otAssistant);
      this.f['remarks'].setValue(operation.remarks);
      this.f['result'].setValue(operation.result);
    }
  }

  onOperationCategoryChange() {
    this.filteredOperations = this.operations.filter(x => x.operationCategoryId == this.f['operationCategoryId'].value);
  }

  private setFormData() {
    this.operationCategories = this.operationSetupService.getOperationCategoryList();
    this.operations = this.operationSetupService.getOperations();
    this.doctors = this.commonService.getDoctorsNameList();
  }

  get f() {
    return this.operationForm.controls;
  }

  onSubmit() {
    this.operationForm.markAllAsTouched();
    if (this.operationForm.valid) {
      const operation: Operation = this.operationForm.getRawValue();
      if (this.isEdit) {
        operation.id = this.id!;
        this.data.updateOperation(operation);
      }
      else {
        this.data.addOperation(operation);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Operation details has been updated successfully!' : 'Operation details has been added successfully!', 'Success!');
    }
  }
}
