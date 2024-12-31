import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RadiologyDataService } from '../../shared/services/radiology-data.service';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { RadiologySampleCollected } from '../../shared/models/radiology';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'radiology-sample-collection-form',
  templateUrl: './radiology-sample-collection-form.component.html',
  styleUrls: ['./radiology-sample-collection-form.component.scss']
})
export class RadiologySampleCollectionFormComponent {
  sampleCollectionForm!: UntypedFormGroup;
  @Input() id: number = 0;
  @Input() testId: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  sampleCollectionPersons: Array<SimpleRecord> = [];
  
  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder,
    private data: RadiologyDataService, commonService : CommonService) {
      this.sampleCollectionPersons = commonService.getRadiologistsNameList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.sampleCollectionForm = this.fb.group({
      collectedById: ['', [Validators.required]],
      collectedDate: [new Date(), [Validators.required]],
      radiologyCenter: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
      let sampleCollected = this.data.getRadiologyById(this.id)?.testInnerForm.find(x => x.testId === this.testId)?.radiologySampleCollected;
      if (sampleCollected) {
        this.f['collectedById'].setValue(sampleCollected?.collectedById);
        this.f['collectedDate'].setValue(sampleCollected?.collectedDate);
        this.f['radiologyCenter'].setValue(sampleCollected?.radiologyCenter);
      }
  }

  get f() {
    return this.sampleCollectionForm.controls;
  }

  onSubmit() {
    this.sampleCollectionForm.markAllAsTouched();
    if (this.sampleCollectionForm.valid) {
      const sampleCollected: RadiologySampleCollected = this.sampleCollectionForm.getRawValue();
      this.data.updateSampleCollection(sampleCollected, this.id, this.testId);
      this.onSave.next(true);
      this.toaster.typeSuccess('Sample collection details has been saved successfully!', 'Success!');
    }
  }
}
