import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService, ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { NurseNoteComment } from '../../../shared/models/nurse-note';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'app-ipd-nurse-note-comment-form',
  templateUrl: './ipd-nurse-note-comment-form.component.html',
  styleUrls: ['./ipd-nurse-note-comment-form.component.scss']
})
export class IPDNurseNoteCommentFormComponent {
  nurseNoteCommentForm!: UntypedFormGroup;
  @Input() nurseNoteId: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  nurses: Array<SimpleRecord> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private data: IpdDataService, 
    dataService: DataService, commonService : CommonService) {
    this.nurses = commonService.getNursesNameList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.nurseNoteCommentForm = this.fb.group({
      nurseNoteId: [this.nurseNoteId, [Validators.required]],
      comment: [null, [Validators.required]],
    });
  }

  get f() {
    return this.nurseNoteCommentForm.controls;
  }

  onSubmit() {
    this.nurseNoteCommentForm.markAllAsTouched();
    if (this.nurseNoteCommentForm.valid) {
      const nurseNoteComment: NurseNoteComment = this.nurseNoteCommentForm.getRawValue();
      this.data.addNurseNoteComment(nurseNoteComment.comment, nurseNoteComment.nurseNoteId);
      this.onSave.next(true);
      this.toaster.typeSuccess('Comment has been updated successfully!', 'Success!');
    }
  }
}
