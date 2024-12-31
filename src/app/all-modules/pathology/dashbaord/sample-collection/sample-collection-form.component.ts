import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PathologyDataService } from '../../shared/services/pathology-data.service';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { SampleCollected } from '../../shared/models/pathology';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'sample-collection-form',
  templateUrl: './sample-collection-form.component.html',
  styleUrls: ['./sample-collection-form.component.scss']
})
export class SampleCollectionFormComponent {
  sampleCollectionForm!: UntypedFormGroup;
  @Input() id: number = 0;
  @Input() testId: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  sampleCollectionPersons: Array<SimpleRecord> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private datePipe: DatePipe,
    private data: PathologyDataService, commonService : CommonService) {
    this.sampleCollectionPersons = commonService.getPathologistsNameList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.sampleCollectionForm = this.fb.group({
      collectedById: ['', [Validators.required]],
      collectedDate: [new Date(), [Validators.required]],
      pathologyCenter: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    let sampleCollected = this.data.getPathologyById(this.id)?.testInnerForm.find(x => x.testId === this.testId)?.sampleCollected;
    if (sampleCollected) {
      this.f['collectedById'].setValue(sampleCollected?.collectedById);
      this.f['collectedDate'].setValue(sampleCollected?.collectedDate);
      this.f['pathologyCenter'].setValue(sampleCollected?.pathologyCenter);
    }
  }

  get f() {
    return this.sampleCollectionForm.controls;
  }

  onSubmit() {
    this.sampleCollectionForm.markAllAsTouched();
    if (this.sampleCollectionForm.valid) {
      const sampleCollected: SampleCollected = this.sampleCollectionForm.getRawValue();
      this.data.updateSampleCollection(sampleCollected, this.id, this.testId);
      this.onSave.next(true);
      this.toaster.typeSuccess('Sample collection details has been saved successfully!', 'Success!');
    }
  }
}
