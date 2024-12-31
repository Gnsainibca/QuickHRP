import { Component } from '@angular/core';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { HospitalChargeSetupService } from '../../shared/services/hospital-charge-setup.service';
import { SetupHospitalChargeTypeFormComponent } from '../form/setup-hospital-charge-type-form.component';
import { Master_HospitalChargeType } from '../../shared/models/master_hospital-charge-type';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'app-setup-hospital-charge-type-list',
  templateUrl: './setup-hospital-charge-type-list.component.html',
  styleUrls: ['./setup-hospital-charge-type-list.component.scss']
})
export class SetupHospitalChargeTypeListComponent {
  public chargeTypes: Array<Master_HospitalChargeType> = [];
  modules: Array<SimpleRecord> = [];

  constructor(private modalService: NgbModal, private toaster: ToasterService, private service : HospitalChargeSetupService,
    commonService: CommonService
  ) { 
    this.modules = commonService.getChargeModules();
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

  checkForEnabledModule(module: SimpleRecord, innerForm: Array<SimpleRecord>) {
    return innerForm?.length > 0 ? innerForm.some(x => x.id === module.id) : false;
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(SetupHospitalChargeTypeFormComponent, { backdrop: 'static', size: 'lg', scrollable: true  });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(SetupHospitalChargeTypeFormComponent, { backdrop: 'static', size: 'lg', scrollable: true  });
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
        this.service.deleteChargeType(id);
        this.toaster.typeSuccess('Charge type has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.chargeTypes = this.service.getChargeTypes().sort((a, b) => b.id - a.id) as Array<Master_HospitalChargeType>;
  }
}
