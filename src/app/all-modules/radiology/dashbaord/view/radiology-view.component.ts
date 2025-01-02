import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RadiologyDataService } from '../../shared/services/radiology-data.service';
import { RadiologyList } from '../../shared/models/radiology';
import { RadiologySampleCollectionFormComponent } from '../sample-collection/radiology-sample-collection-form.component';
import { RadiologyApproveReportFormComponent } from '../approve-report/radiology-approve-report-form.component';
import { PatientList } from 'src/app/shared/models/patient';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'app-radiology-view',
  templateUrl: './radiology-view.component.html',
  styleUrls: ['./radiology-view.component.scss']
})
export class RadiologyViewComponent {

  @Input() id: number = 0;
  public radiology !: RadiologyList;
  patient !: PatientList;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, 
    private data: RadiologyDataService, private commonService: CommonService) {
  }

  ngOnInit() {
    this.radiology = this.data.getRadiologyList().find(x => x.id == this.id)!;
    this.patient = this.commonService.getPatientById(this.radiology.patientId)!;
  }

  addCollectionPerson(testId: number) {
    const modalRef = this.modalService.open(RadiologySampleCollectionFormComponent, { backdrop: 'static', size: 'md', scrollable: true }); // size: 'sm' | 'md' | 'lg' | 'md'
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.testId = testId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.ngOnInit();
      modalRef.close();
    });
  }

  editReport(testId: number) {
    const modalRef = this.modalService.open(RadiologyApproveReportFormComponent, { backdrop: 'static', size: 'md', scrollable: true });
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.testId = testId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.ngOnInit();
      modalRef.close();
    });
  }

  download(testId: number) {
    let approvedReport = this.radiology.testInnerForm.find(x => x.testId === testId)?.radiologyApproveReport;
    if (approvedReport?.attachmentName) {
      const downloadLink = document.createElement('a');
      const fileName = approvedReport?.attachmentName!;
      downloadLink.href = approvedReport?.attachment!;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  }
}
