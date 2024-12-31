import { Component, Input } from '@angular/core';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { ActivatedRoute } from '@angular/router';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { Timeline } from 'src/app/all-modules/opd/shared/models/timeline';
import { IPDTimelineFormComponent } from '../form/ipd-timeline-form.component';

@Component({
  selector: 'app-ipd-timeline-list',
  templateUrl: './ipd-timeline-list.component.html',
  styleUrls: ['./ipd-timeline-list.component.scss']
})
export class IPDTimelineListComponent {
  public timelines: Array<Timeline> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  private opdPatientId : number = 0;
  public routes = routes;
  @Input() hasPatientDischarged: boolean = false;

  constructor(private route: ActivatedRoute, private modalService: NgbModal, private data: OpdDataService, private toaster: ToasterService) { 
    this.opdPatientId = this.route.snapshot.params['id']!;
  }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  public add(){
    this.openModal_Add();
  }

  public edit(id:number){
    this.openModal_Edit(id);
  }

  public delete(id:number){
    this.openModal_DeleteConfirmation(id);
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(IPDTimelineFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.opdPatientId = this.opdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(IPDTimelineFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.opdPatientId = this.opdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_DeleteConfirmation(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalContent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation?';
    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this ?';

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.data.deleteTimeline(id);
        this.toaster.typeSuccess('Timeline details has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.timelines = this.data.getTimelineList(this.opdPatientId).sort((a, b) => b.id - a.id);
  }
}
