import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OpdDataService } from '../../../shared/services/opd.service';
import { Timeline } from '../../../shared/models/timeline';

@Component({
  selector: 'app-timeline-form',
  templateUrl: './timeline-form.component.html',
  styleUrls: ['./timeline-form.component.scss']
})
export class TimelineFormComponent {
  timelineForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Input() opdPatientId: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private data: OpdDataService) {
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    this.timelineForm = this.fb.group({
      opdPatientId: [this.opdPatientId, [Validators.required]],
      title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      description: [null],
      attachment: [null],
      visibleToThisPerson: [null]
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let timeline = this.data.getTimelineById(this.id);
      this.f['opdPatientId'].setValue(timeline.opdPatientId);
      this.f['title'].setValue(timeline.title);
      this.f['date'].setValue(timeline.date);
      this.f['description'].setValue(timeline.description);
      this.f['attachment'].setValue(timeline.attachment);
      this.f['visibleToThisPerson'].setValue(timeline.visibleToThisPerson);
    }
  }

  private setFormData() {

  }

  get f() {
    return this.timelineForm.controls;
  }

  onSubmit() {
    this.timelineForm.markAllAsTouched();
    if (this.timelineForm.valid) {
      const timeline: Timeline = this.timelineForm.getRawValue();
      if (this.isEdit) {
        timeline.id = this.id!;
        this.data.updateTimeline(timeline);
      }
      else {
        this.data.addTimeline(timeline);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Timeline details has been updated successfully!' : 'Timeline details has been added successfully!', 'Success!');
    }
  }
}
