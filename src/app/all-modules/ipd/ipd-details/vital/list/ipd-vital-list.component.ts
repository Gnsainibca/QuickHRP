import { Component, Input } from '@angular/core';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { IPDVitalFormComponent } from '../form/ipd-vital-form.component';
import { Master_Vital } from 'src/app/all-modules/setup/vital/shared/models/master-vital';
import { VitalSetupService } from 'src/app/all-modules/setup/vital/shared/services/vital-setup.service';
import { VitalStatus } from 'src/app/shared/enums/vital-status';

@Component({
  selector: 'app-ipd-vital-list',
  templateUrl: './ipd-vital-list.component.html',
  styleUrls: ['./ipd-vital-list.component.scss']
})
export class IPDVitalListComponent {
  vitalStatus = VitalStatus;
  public routes = routes;
  public vitalList: any = [];
  public vitalTypes: Array<Master_Vital> = [];
  private opdPatientId : number = 0;
  @Input() hasPatientDischarged: boolean = false;
  
  constructor(private modalService: NgbModal,private route: ActivatedRoute, private data: OpdDataService,
     private vitalSetupService : VitalSetupService, private toaster: ToasterService) { }

  ngOnInit() {
    this.opdPatientId = this.route.snapshot.params['id']!;
    this.vitalTypes = this.vitalSetupService.getVitalList();
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
    const modalRef = this.modalService.open(IPDVitalFormComponent, { backdrop: 'static', size: 'xl', scrollable: true  });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.opdPatientId = this.opdPatientId; 
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.getList();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(IPDVitalFormComponent, {  backdrop: 'static', size: 'xl', scrollable: true  });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.opdPatientId = this.opdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.getList();
      modalRef.close();
    });
  }

  private openModal_DeleteConfirmation(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalContent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation?';
    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this ?';

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.data.deleteVital(id);
        this.toaster.typeSuccess('Vital details has been deleted successfully!', 'Success!');
        this.getList();
      }
    });
  }

  private getList(): void {
    this.vitalList = this.data.getVitalList(this.opdPatientId);
  }
  
  getVitalRange(item: Master_Vital) {
    return this.vitalSetupService.getNameWithVitalRangeInNewLine(item);
  }
}
