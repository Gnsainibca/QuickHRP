import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { FrontOfficeDataService } from '../../shared/services/front-office.service';
import { Complain } from '../../shared/models/complain';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { FrontOfficeSetupService } from 'src/app/all-modules/setup/front-office/shared/services/front-office-setup.service';

@Component({
  selector: 'app-complain-form',
  templateUrl: './complain-form.component.html',
  styleUrls: ['./complain-form.component.scss']
})
export class ComplainFormComponent {
  complainForm!: UntypedFormGroup;
  visitToOptions!: Array<string>;
  relatedToOptions!: Array<string>
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  sourceList : Array<SimpleRecord> = [];
  complainTypeList : Array<SimpleRecord> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private datePipe: DatePipe, 
    private data: FrontOfficeDataService, setupService : FrontOfficeSetupService) {
      this.sourceList = setupService.getSourceList();
      this.complainTypeList = setupService.getComplainTypeList();
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    var date = new Date();
    this.complainForm = this.fb.group({
      complainTypeId: ['', [Validators.required]],
      sourceId: ['', [Validators.required]],
      complainBy: [null, [Validators.required]],
      phone: [null],
      date: [this.datePipe.transform(date, "dd-MMM-yyyy"), [Validators.required]],
      description: [null],
      actionTaken: [null],
      assigned: [null],
      note: [null]
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let complain = this.data.getComplainById(this.id);
      this.f['complainTypeId'].setValue(complain.complainTypeId);
      this.f['sourceId'].setValue(complain.sourceId);
      this.f['complainBy'].setValue(complain.complainBy);
      this.f['phone'].setValue(complain.phone);
      this.f['date'].setValue(new Date(complain.date));
      this.f['description'].setValue(complain.description);
      this.f['actionTaken'].setValue(complain.actionTaken);
      this.f['assigned'].setValue(complain.assigned);
      this.f['note'].setValue(complain.note);
    }
  }

  private setFormData() {
    this.visitToOptions = this.data.visitToOptions;
  }

  get f() {
    return this.complainForm.controls;
  }

  onSubmit() {
    this.complainForm.markAllAsTouched();
    if (this.complainForm.valid) {
      const complain: Complain = this.complainForm.getRawValue();
      if (this.isEdit) {
        complain.id = this.id!;
        this.data.updateComplain(complain);
      }
      else {
        this.data.addComplain(complain);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Complain has been updated successfully!' : 'Complain has been added successfully!', 'Success!');
    }
  }
}
