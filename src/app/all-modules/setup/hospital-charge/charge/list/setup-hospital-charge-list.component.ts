import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { getColumnDefinations } from './setup-hospital-charge-list-column-defination';
import { Master_HospitalChargeDetails } from '../../shared/models/master_hospital-charge';
import { HospitalChargeSetupService } from '../../shared/services/hospital-charge-setup.service';
import { SetupHospitalChargeViewComponent } from '../view/setup-hospital-charge-view.component';
import { SetupHospitalChargeFormComponent } from '../form/setup-hospital-charge-form.component';

@Component({
  selector: 'app-setup-hospital-charge-list',
  templateUrl: './setup-hospital-charge-list.component.html',
  styleUrls: ['./setup-hospital-charge-list.component.scss']
})
export class SetupHospitalChargeListComponent {
  public hospitalCharges: Array<Master_HospitalChargeDetails> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations();

  constructor(private modalService: NgbModal, private toaster: ToasterService, private service : HospitalChargeSetupService) { 
   
  }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  public view(id:number){
    this.openModal_View(id);
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

  private openModal_View(id: number) {
    const modalRef = this.modalService.open(SetupHospitalChargeViewComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.id = id;
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(SetupHospitalChargeFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(SetupHospitalChargeFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
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
        this.service.deleteHospitalCharge(id);
        this.toaster.typeSuccess('Charge has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.hospitalCharges = this.service.getHospitalChargeList().sort((a, b) => b.id - a.id) as Array<Master_HospitalChargeDetails>;
  }
}
