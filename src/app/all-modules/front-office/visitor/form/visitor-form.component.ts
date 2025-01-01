import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { Visitor } from '../../shared/models/visitor';
import { FrontOfficeDataService } from '../../shared/services/front-office.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { FrontOfficeSetupService } from 'src/app/all-modules/setup/front-office/shared/services/front-office-setup.service';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'app-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.scss']
})
export class VisitorFormComponent {
  visitorForm!: UntypedFormGroup;
  visitToOptions!: Array<string>;
  relatedToOptions!: Array<SimpleRecord>
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  typeaheadLoading: boolean = false;
  typeaheadNoResults: boolean = false;
  purposeList: Array<SimpleRecord> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder,
    private data: FrontOfficeDataService, setupService: FrontOfficeSetupService, private commonService: CommonService) {
    this.purposeList = setupService.getPurposeList();
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    this.visitorForm = this.fb.group({
      purposeId: ['', [Validators.required]],
      name: [null, [Validators.required]],
      idCard: [null, [Validators.required]],
      visitTo: ['', [Validators.required]],
      relatedTo: ['', [Validators.required]],
      noOfPerson: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      date: [new Date()],
      inTime: [null, [Validators.required]],
      outTime: [null],
      note: [null]
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let visitor = this.data.getVisitorById(this.id);
      this.f['purposeId'].setValue(visitor.purposeId);
      this.f['name'].setValue(visitor.name);
      this.f['idCard'].setValue(visitor.idCard);
      this.f['visitTo'].setValue(visitor.visitTo);
      this.onVisitToChange();
      this.f['relatedTo'].setValue(visitor.relatedTo);
      this.f['noOfPerson'].setValue(visitor.noOfPerson);
      this.f['phone'].setValue(visitor.phone);
      this.f['date'].setValue(visitor.date);
      this.f['inTime'].setValue(visitor.inTime);
      this.f['outTime'].setValue(visitor.outTime);
      this.f['note'].setValue(visitor.note);
    }
    this.f['date']?.disable();
  }

  private setFormData() {
    this.visitToOptions = this.data.visitToOptions;
  }

  get f() {
    return this.visitorForm.controls;
  }

  onVisitToChange() {
    this.f['relatedTo'].setValue(null);
    const selectedVisitTo = this.f['visitTo'].value;
    switch (selectedVisitTo) {
      case 'Staff': {
        this.relatedToOptions = this.commonService.getStaffsNameWithIdList();
        break;
      }
      case 'OPD Patient': {
        this.relatedToOptions = this.commonService.getOpdPatientNameList();
        break;
      }
      case 'IPD Patient': {
        this.relatedToOptions = this.commonService.getIpdPatientNameList();
        break;
      }
    }
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    // console.log('Selected value: ', e.value);
  }

  onSubmit() {
    this.visitorForm.markAllAsTouched();
    if (this.visitorForm.valid) {
      const visitor: Visitor = this.visitorForm.getRawValue();
      if (this.isEdit) {
        visitor.id = this.id!;
        this.data.updateVisitor(visitor);
      }
      else {
        this.data.addVisitor(visitor);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Visitor has been updated successfully!' : 'Visitor has been added successfully!', 'Success!');
    }
  }
}
