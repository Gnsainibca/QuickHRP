import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { FrontOfficeSetupService } from '../../shared/services/front-office-setup.service';
import { Master_ComplainType } from '../../shared/models/master-complain-type';
import { getColumnDefinations } from './setup-complain-type-list-column-defination';
import { SetupComplainTypeFormComponent } from '../form/setup-complain-type-form.component';

@Component({
  selector: 'app-setup-complain-type-list',
  templateUrl: './setup-complain-type-list.component.html',
  styleUrls: ['./setup-complain-type-list.component.scss']
})
export class SetupComplainTypeListComponent {
  public complainTypeList: Array<Master_ComplainType> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations();

  constructor(private modalService: NgbModal, private toaster: ToasterService, private service : FrontOfficeSetupService) { 
   
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
    const modalRef = this.modalService.open(SetupComplainTypeFormComponent, { backdrop: 'static', size: 'lg', scrollable: true  });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(SetupComplainTypeFormComponent, { backdrop: 'static', size: 'lg', scrollable: true  });
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
        this.service.deleteComplainType(id);
        this.toaster.typeSuccess('Complain Type has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.complainTypeList = this.service.getComplainTypeList().sort((a, b) => b.id - a.id) as Array<Master_ComplainType>;
  }
}
