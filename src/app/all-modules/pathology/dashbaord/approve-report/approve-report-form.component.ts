import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PathologyDataService } from '../../shared/services/pathology-data.service';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { ApproveReport } from '../../shared/models/pathology';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'approve-report-form',
  templateUrl: './approve-report-form.component.html',
  styleUrls: ['./approve-report-form.component.scss']
})
export class ApproveReportFormComponent {
  approveReportForm!: UntypedFormGroup;
  @Input() id: number = 0;
  @Input() testId: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  approveReportPersons: Array<SimpleRecord> = [];
  fileToUpload: File | null = null;

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private datePipe: DatePipe,
    private data: PathologyDataService, commonService : CommonService) {
    this.approveReportPersons = commonService.getPathologistsNameList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.approveReportForm = this.fb.group({
      approvedById: ['', [Validators.required]],
      approvedDate: [new Date(), [Validators.required]],
      result: [null],
      reportValue: [null, [Validators.required]],
      attachment: [null],
      attachmentName: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
      let approvedReport = this.data.getPathologyById(this.id)?.testInnerForm.find(x => x.testId === this.testId)?.approveReport;
      if (approvedReport) {
        this.f['approvedById'].setValue(approvedReport?.approvedById);
        this.f['approvedDate'].setValue(approvedReport?.approvedDate);
        this.f['result'].setValue(approvedReport?.result);
        this.f['reportValue'].setValue(approvedReport?.reportValue);
        this.f['attachment'].setValue(approvedReport?.attachment);
        this.f['attachmentName'].setValue(approvedReport?.attachmentName);
      }
  }

  get f() {
    return this.approveReportForm.controls;
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.f['attachmentName'].setValue(file.name);
    reader.onload = () => {
      this.f['attachment'].setValue(reader.result);
    };
  }

  download() {
    const downloadLink = document.createElement('a');
    const fileName =  this.f['attachmentName'].value;
    downloadLink.href = this.f['attachment']?.value;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  onSubmit() {
    this.approveReportForm.markAllAsTouched();
    if (this.approveReportForm.valid) {
      const approveReport: ApproveReport = this.approveReportForm.getRawValue();
      this.data.updateApprovedReport(approveReport, this.id, this.testId);
      this.onSave.next(true);
      this.toaster.typeSuccess('Approve report details has been saved successfully!', 'Success!');
    }
  }
}
