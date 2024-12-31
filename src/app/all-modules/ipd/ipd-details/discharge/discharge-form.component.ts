import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { IpdDataService } from '../../shared/servives/Ipd.service';
import { IpdPatient } from '../../shared/models/ipd-patient';
import { Discharge } from '../../shared/models/ipd-patient-discharge';

@Component({
  selector: 'app-discharge-form',
  templateUrl: './discharge-form.component.html',
  styleUrls: ['./discharge-form.component.scss']
})
export class DischargeFormComponent {
  dischargeForm!: UntypedFormGroup;
  @Input() ipdPatientId: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  dischargeStatusList: Array<SimpleRecord> = [
    { id: 1, name: 'Normal' },
    { id: 2, name: 'Refer' },
    { id: 3, name: 'Death' },
  ];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: IpdDataService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.dischargeForm = this.fb.group({
      dischargeDate: [null, [Validators.required]],
      dischargeStatusId: ['', [Validators.required]],
      dischargeNote: [null],
      dischargeOperation: [null],
      dischargeDiagnosis: [null],
      dischargeInvestigation: [null],
      dischargeTreatmentHome: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    let ipdPatient = this.service.getIpdPatientById(this.ipdPatientId) as IpdPatient;
    if (ipdPatient.dischargeDate) {
      this.f['dischargeDate'].setValue(ipdPatient.dischargeDate);
      this.f['dischargeStatusId'].setValue(ipdPatient.dischargeStatusId);
      this.f['dischargeNote'].setValue(ipdPatient.dischargeNote);
      this.f['dischargeOperation'].setValue(ipdPatient.dischargeOperation);
      this.f['dischargeDiagnosis'].setValue(ipdPatient.dischargeDiagnosis);
      this.f['dischargeInvestigation'].setValue(ipdPatient.dischargeInvestigation);
      this.f['dischargeTreatmentHome'].setValue(ipdPatient.dischargeTreatmentHome);
    }
  }

  get f() {
    return this.dischargeForm.controls;
  }

  onSubmit() {
    this.dischargeForm.markAllAsTouched();
    if (this.dischargeForm.valid) {
      const discharge: Discharge = this.dischargeForm.getRawValue();
      this.service.dischargePatient(discharge, this.ipdPatientId);
      this.onSave.next(true);
      this.toaster.typeSuccess('Discharge details has been added successfully!', 'Success!');
    }
  }
}
