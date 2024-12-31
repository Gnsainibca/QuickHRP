import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PathologyDataService } from '../../shared/services/pathology-data.service';
import { PathologyList } from '../../shared/models/pathology';
import { SampleCollectionFormComponent } from '../sample-collection/sample-collection-form.component';
import { ApproveReportFormComponent } from '../approve-report/approve-report-form.component';

@Component({
  selector: 'app-pathology-view',
  templateUrl: './pathology-view.component.html',
  styleUrls: ['./pathology-view.component.scss']
})
export class PathologyViewComponent {

  @Input() id: number = 0;
  public pathology !: PathologyList;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, private data: PathologyDataService) {
  }

  ngOnInit() {
    this.pathology = this.data.getPathologyList().find(x => x.id == this.id)!;
  }

  addCollectionPerson(testId: number) {
      const modalRef = this.modalService.open(SampleCollectionFormComponent, { backdrop: 'static', size: 'md', scrollable: true }); // size: 'sm' | 'md' | 'lg' | 'md'
      modalRef.componentInstance.id = this.id;
      modalRef.componentInstance.testId = testId;
      modalRef.componentInstance.onSave.subscribe((res: any) => {
        this.ngOnInit();
        modalRef.close();
      });
  }

  editReport(testId: number) {
    const modalRef = this.modalService.open(ApproveReportFormComponent, { backdrop: 'static', size: 'md', scrollable: true });
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.testId = testId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.ngOnInit();
      modalRef.close();
    });
  }

  download(testId: number) {
    let approvedReport = this.pathology.testInnerForm.find(x => x.testId === testId)?.approveReport;
    if (approvedReport?.attachmentName) {
      const downloadLink = document.createElement('a');
      const fileName = approvedReport?.attachmentName!;
      downloadLink.href = approvedReport?.attachment!;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  }
}
