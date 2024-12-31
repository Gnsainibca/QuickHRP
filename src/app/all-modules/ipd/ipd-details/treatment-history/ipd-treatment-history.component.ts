import { Component, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OpdPatient } from 'src/app/all-modules/opd/shared/models/opd-patient';
import { getColumnDefinations } from './ipd-treatment-history-column-defination';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { IPDFormComponent } from '../../dashboard/form/ipd-form.component';
import { IpdViewComponent } from '../../dashboard/view/ipd-view.component';
import { IpdDataService } from '../../shared/servives/Ipd.service';
import { IpdPatientList } from '../../shared/models/ipd-patient-list';

@Component({
  selector: 'app-ipd-treatment-history',
  templateUrl: './ipd-treatment-history.component.html',
  styleUrls: ['./ipd-treatment-history.component.scss']
})
export class IPDTreatmentHistoryComponent {
  public IpdPatientList: Array<IpdPatientList> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  private ipdPatientId : number = 0;
  public routes = routes;
  @Input() hasPatientDischarged: boolean = false;
  
  // Column Definitions: Defines the columns to be displayed.
  colDefs !: ColDef[];

  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private modalService: NgbModal, private data: IpdDataService, private toaster: ToasterService) { 
    this.ipdPatientId = this.route.snapshot.params['id']!;
  }

  ngOnInit() {
    this.colDefs = getColumnDefinations(this.datePipe, this.hasPatientDischarged);
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  public view(id:number){
    this.openModal_View(id);
  }

  public edit(id:number){
    this.openModal_Edit(id);
  }

  public delete(id:number){
    this.openModal_DeleteConfirmation(id);
  }

  private openModal_View(id: number) {
    const modalRef = this.modalService.open(IpdViewComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.patientVisitId = id;
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(IPDFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.patientVisitId = id;
    modalRef.componentInstance.isEdit = true;
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
        this.data.deleteIpdPatient(id);
        this.toaster.typeSuccess('Opd patient details has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.IpdPatientList = this.data.getIpdPatientsTreatmentHistory(this.ipdPatientId).sort((a, b) => b.id - a.id);
  }
}
