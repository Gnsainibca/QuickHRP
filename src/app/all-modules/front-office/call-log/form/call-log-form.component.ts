import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { FrontOfficeDataService } from '../../shared/services/front-office.service';
import { CallLog } from '../../shared/models/call-log';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-call-log-form',
  templateUrl: './call-log-form.component.html',
  styleUrls: ['./call-log-form.component.scss']
})
export class CallLogFormComponent {
  callLogForm!: UntypedFormGroup;
  visitToOptions!: Array<string>;
  relatedToOptions!: Array<string>
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService,
     private fb: FormBuilder, private data: FrontOfficeDataService) {
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    this.callLogForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      date: [new Date(), [Validators.required]],
      description: [null],
      nextFollowUpDate: [''],
      callDuration: [''],
      callType: ['Incoming'],
      note: [null]
    });
    this.setFormControls();
  }

  private setFormControls() {
    let callLog!: CallLog;
    if (this.isEdit) {
      callLog = this.data.getCallLogById(this.id);
      this.f['name'].setValue(callLog.name);
      this.f['phone'].setValue(callLog.phone);
      this.f['date'].setValue(new Date(callLog.date));
      this.f['description'].setValue(callLog.description);
      if (callLog.nextFollowUpDate) {
        this.f['nextFollowUpDate'].setValue(new Date(callLog.nextFollowUpDate));
      }
      this.f['callDuration'].setValue(callLog.callDuration);
      this.f['callType'].setValue(callLog.callType);
      this.f['note'].setValue(callLog.note);
    }
  }

  private setFormData() {
    this.visitToOptions = this.data.visitToOptions;
  }

  get f() {
    return this.callLogForm.controls;
  }

  onSubmit() {
    this.callLogForm.markAllAsTouched();
    if (this.callLogForm.valid) {
      const callLog: CallLog = this.callLogForm.getRawValue();
      if (this.isEdit) {
        callLog.id = this.id!;
        this.data.updateCallLog(callLog);
      }
      else {
        this.data.addCallLog(callLog);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Phone Call Log has been updated successfully!' : 'Phone Call Log has been added successfully!', 'Success!');
    }
  }
}
