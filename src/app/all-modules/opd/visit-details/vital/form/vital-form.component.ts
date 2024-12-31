import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'src/app/shared/core.index';
import { OpdDataService } from '../../../shared/services/opd.service';
import { Vital } from '../../../shared/models/vital';
import { Master_Vital } from 'src/app/all-modules/setup/vital/shared/models/master-vital';
import { VitalSetupService } from 'src/app/all-modules/setup/vital/shared/services/vital-setup.service';
import { Options } from "@angular-slider/ngx-slider";
import { VitalStatus } from 'src/app/shared/enums/vital-status';

@Component({
  selector: 'app-vital-form',
  templateUrl: './vital-form.component.html',
  styleUrls: ['./vital-form.component.scss']
})
export class VitalFormComponent {
  vitalForm!: FormGroup;
  vitalStatus = VitalStatus;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Input() opdPatientId: number = 0;
  vitalTypes: Array<Master_Vital> = [];
  @Output() onSave = new EventEmitter<boolean>();

  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: VitalStatus.Low, legend: VitalStatus[VitalStatus.Low] },
      { value: VitalStatus.Normal, legend: VitalStatus[VitalStatus.Normal] },
      { value: VitalStatus.High, legend: VitalStatus[VitalStatus.High] }
    ]
  };

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private toaster: ToasterService,
    private data: OpdDataService, private vitalSetupService: VitalSetupService) {
    this.vitalTypes = vitalSetupService.getVitalList();
  }

  ngOnInit() {
    if (this.isEdit) {
      let vital = this.data.getVitalById(this.id);
      this.vitalForm = this.fb.group({
        vitalInnerForm: this.fb.array(
          [
            this.fb.group(
              {
                opdPatientId: [this.opdPatientId, [Validators.required]],
                vitalId: [vital.vitalId, [Validators.required]],
                value: [vital.value, [Validators.required]],
                date: [vital.date, [Validators.required]],
                status: [vital.status],
              }
            )
          ]
        )
      });
    } else {
      this.vitalForm = this.fb.group({
        vitalInnerForm: this.fb.array(
          [
            this.fb.group(
              {
                opdPatientId: [this.opdPatientId, [Validators.required]],
                vitalId: ['', [Validators.required]],
                value: [null, [Validators.required]],
                date: [new Date(), [Validators.required]],
                status: [VitalStatus.Normal],
              }
            )
          ]
        )
      });
    }
  }

  onVitalChange(index: number) {
    this.onVitalValueChange(index);
  }

  onVitalValueChange(index: number) {
    let vitalId = this.vitalInnerForm.controls[index].get('vitalId')?.value;
    if (vitalId) {
      let value = this.vitalInnerForm.controls[index].get('value')?.value;
      let vital = this.vitalSetupService.getVital(vitalId);
      let status = this.vitalSetupService.getVitalStatus(value, vital.fromValue, vital.toValue);
      this.vitalInnerForm.controls[index].get('status')?.setValue(status);
    }
  }

  getVitalRange(item: Master_Vital) {
    return this.vitalSetupService.getNameWithVitalRange(item);
  }

  get vitalInnerForm() {
    return this.vitalForm.get('vitalInnerForm') as FormArray;
  }

  addVital() {
    this.vitalInnerForm.push(this.fb.group({
      opdPatientId: [this.opdPatientId, [Validators.required]],
      vitalId: ['', [Validators.required]],
      value: [null, [Validators.required]],
      date: [new Date(), [Validators.required]],
      status: [VitalStatus.Normal],
    }));
  }

  deleteSellingPoint(index: number) {
    this.vitalInnerForm.removeAt(index);
  }

  onSubmit() {
    this.vitalForm.markAllAsTouched();
    if (this.vitalForm.valid) {
      const vitals: Array<Vital> = this.vitalInnerForm.getRawValue();
      if (this.isEdit) {
        let vital = vitals[0];
        vital.id = this.id!;
        this.data.updateVital(vital);
      }
      else {
        this.data.addVitals(vitals);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess('Vital details has been added successfully!', 'Success!');
    }
  }
}