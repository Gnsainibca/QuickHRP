import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { getColumnDefinations } from './ipd-list-column-defination';
import { IpdViewComponent } from '../view/ipd-view.component';
import { IPDFormComponent } from '../form/ipd-form.component';
import { IpdDataService } from '../../shared/servives/Ipd.service';
import { IpdPatientList } from '../../shared/models/ipd-patient-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ipd-list',
  templateUrl: './ipd-list.component.html',
  styleUrls: ['./ipd-list.component.scss']
})
export class IPDListComponent {
  public ipdPatientList: Array<IpdPatientList> = [];
  public pagination: boolean = true;
  public bedId: number = 0;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  public routes = routes;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);

  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private modalService: NgbModal,
    private service: IpdDataService, private toaster: ToasterService) {

  }

  ngOnInit() {
    this.refereshGrid();

    this.bedId =  parseInt(this.route.snapshot.params['bedId']!);
    if (this.bedId > 0) {
      this.openModal_Add();
    }
  }

  public refereshGrid() {
    this.getList();
  }

  public view(id: number) {
    this.openModal_View(id);
  }

  public add() {
    this.openModal_Add();
  }

  public edit(id: number) {
    this.openModal_Edit(id);
  }

  public delete(id: number) {
    this.openModal_DeleteConfirmation(id);
  }

  private openModal_View(id: number) {
    const modalRef = this.modalService.open(IpdViewComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.id = id;
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(IPDFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.bedId = this.bedId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(IPDFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
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
        this.service.deleteIpdPatient(id);
        this.toaster.typeSuccess('Ipd patient details has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }

  private getList(): void {
    this.ipdPatientList = this.service.getIpdAdmittedPatientList().sort((a, b) => b.id - a.id);
  }
}
