import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IpdDataService } from '../../shared/servives/Ipd.service';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { Master_BedDetails } from 'src/app/all-modules/setup/bed/shared/models/master-bed';
import { BedSetupService } from 'src/app/all-modules/setup/bed/shared/services/bed-setup.service';

@Component({
  selector: 'app-discharge-revert-form',
  templateUrl: './discharge-revert-form.component.html',
  styleUrls: ['./discharge-revert-form.component.scss']
})
export class DischargeRevertFormComponent {
  dischargeRevertForm!: UntypedFormGroup;
  @Input() ipdPatientId: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  bedGroups: Array<SimpleRecord> = [];
  bedNumbers: Array<Master_BedDetails> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, 
    private service: IpdDataService, private bedService: BedSetupService) {
    this.bedGroups = bedService.getBedGroupNameList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.dischargeRevertForm = this.fb.group({
      bedGroupId: ['', [Validators.required]],
      bedId: ['', [Validators.required]],
      revertReason: [null, [Validators.required]],
    });
  }

  get f() {
    return this.dischargeRevertForm.controls;
  }

  onBedGroupChange() {
    this.f['bedId'].setValue('');
    this.bedNumbers = this.bedService.getBedList().filter(x => x.bedGroupId == this.f['bedGroupId']?.value);
  }

  onSubmit() {
    this.dischargeRevertForm.markAllAsTouched();
    if (this.dischargeRevertForm.valid) {
      const discharge = this.dischargeRevertForm.getRawValue();
      this.service.dischargePatientRevert(discharge.revertReason!,discharge.bedId, this.ipdPatientId);
      this.onSave.next(true);
      this.toaster.typeSuccess('Discharge reverted successfully!', 'Success!');
    }
  }
}
