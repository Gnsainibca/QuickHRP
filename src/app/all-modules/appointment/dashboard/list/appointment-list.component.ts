import { Component } from '@angular/core';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { ColDef } from 'ag-grid-community';
import { AppointmentList } from '../../shared/models/appointment';
import { AppointmentDataService } from '../../shared/services/appointment-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { AppointmentViewComponent } from '../view/appointment-view.component';
import { AppointmentFormComponent } from '../form/appointment-form.component';
import { getColumnDefinations } from './appointment-list-column-defination';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent {
  public routes = routes;
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);
  public appointmentList: Array<AppointmentList> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  isBillingModule: boolean = false;

  constructor(private datePipe: DatePipe, private modalService: NgbModal, private data: AppointmentDataService, private toaster: ToasterService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.isBillingModule = this.route.snapshot.params['module']! === APP_CONSTANT.billingModule;
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
    const modalRef = this.modalService.open(AppointmentViewComponent, { backdrop: 'static', size: 'lg', scrollable: true });
    modalRef.componentInstance.appointmentId = id;
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(AppointmentFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(AppointmentFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
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
        this.data.deleteAppointment(id);
        this.toaster.typeSuccess('Appointment has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }

  private getList(): void {
    this.appointmentList = this.data.getAppointments();
  }
}
