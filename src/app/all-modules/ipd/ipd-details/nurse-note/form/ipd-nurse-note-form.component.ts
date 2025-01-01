import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService, ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { NurseNote } from '../../../shared/models/nurse-note';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'app-ipd-nurse-note-form',
  templateUrl: './ipd-nurse-note-form.component.html',
  styleUrls: ['./ipd-nurse-note-form.component.scss']
})
export class IPDNurseNoteFormComponent {
  nurseNoteForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Input() ipdPatientId: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  nurses : Array<SimpleRecord> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private data: IpdDataService, 
    commonService: CommonService) {
    this.nurses = commonService.getNursesNameList();
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    this.nurseNoteForm = this.fb.group({
      ipdPatientId: [this.ipdPatientId, [Validators.required]],
      nurseId: ['', [Validators.required]],
      date: [new Date(), [Validators.required]],
      note: [null, [Validators.required]],
      comment: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let nurseNote = this.data.getNurseNoteById(this.id)!;
      this.f['ipdPatientId'].setValue(nurseNote.ipdPatientId);
      this.f['nurseId'].setValue(nurseNote.nurseId);
      this.f['date'].setValue(nurseNote.date);
      this.f['note'].setValue(nurseNote.note);
      this.f['comment'].setValue(nurseNote.comment);
    }
  }

  private setFormData() {

  }

  get f() {
    return this.nurseNoteForm.controls;
  }

  onSubmit() {
    this.nurseNoteForm.markAllAsTouched();
    if (this.nurseNoteForm.valid) {
      const nurseNote: NurseNote = this.nurseNoteForm.getRawValue();
      if (this.isEdit) {
        nurseNote.id = this.id!;
        this.data.updateNurseNote(nurseNote);
      }
      else {
        this.data.addNurseNote(nurseNote);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Nurse note has been updated successfully!' : 'Nurse note has been added successfully!', 'Success!');
    }
  }
}
