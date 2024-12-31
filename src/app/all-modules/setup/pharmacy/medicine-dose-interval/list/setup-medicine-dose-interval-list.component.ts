import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { getColumnDefinations } from './setup-medicine-dose-interval-list-column-defination';
import { Master_MedicineDoseInterval } from '../../shared/models/master-medicine-dose-interval';
import { PharmacySetupService } from '../../shared/services/pharmacy-setup.service';
import { SetupMedicineDoseIntervalFormComponent } from '../form/setup-medicine-dose-interval-form.component';

@Component({
  selector: 'app-setup-medicine-dose-interval-list',
  templateUrl: './setup-medicine-dose-interval-list.component.html',
  styleUrls: ['./setup-medicine-dose-interval-list.component.scss']
})
export class SetupMedicineDoseIntervalListComponent {
  public medicineDoseIntervals: Array<Master_MedicineDoseInterval> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations();

  constructor(private modalService: NgbModal, private toaster: ToasterService, private service : PharmacySetupService) { 
   
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
    const modalRef = this.modalService.open(SetupMedicineDoseIntervalFormComponent, { backdrop: 'static', size: 'md', scrollable: true  });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(SetupMedicineDoseIntervalFormComponent, { backdrop: 'static', size: 'md', scrollable: true  });
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
        this.service.deleteMedicineDoseInterval(id);
        this.toaster.typeSuccess('Medicine dose interval has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.medicineDoseIntervals = this.service.getMedicineDoseIntervalList().sort((a, b) => b.id - a.id) as Array<Master_MedicineDoseInterval>;
  }
}
