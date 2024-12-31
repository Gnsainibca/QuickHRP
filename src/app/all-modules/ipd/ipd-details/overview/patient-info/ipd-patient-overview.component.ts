import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/shared/data/common.service';
import { PatientList } from 'src/app/shared/models/patient';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { DischargeFormComponent } from '../../discharge/discharge-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DischargeRevertFormComponent } from '../../discharge-revert/discharge-revert-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ipd-patient-overview',
  templateUrl: './ipd-patient-overview.component.html',
  styleUrls: ['./ipd-patient-overview.component.scss']
})
export class IPDPatientOverviewComponent {

  @Input() opdPatientId: number = 0;
  hasPatientDischarged: boolean = false;
  patient !: PatientList;

  constructor(private modalService: NgbModal, private commonService: CommonService, private ipdService: IpdDataService, private router: Router) { }

  ngOnInit() {
    let ipdPatient = this.ipdService.getIpdPatientById(this.opdPatientId);
    this.patient = this.commonService.getPatientById(ipdPatient.patientId)!;
    this.hasPatientDischarged = ipdPatient.dischargeStatusId! > 0;
  }

  discharge() {
    this.openModal_Discharge();
  }

  private openModal_Discharge() {
    const modalRef = this.modalService.open(DischargeFormComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.ipdPatientId = this.opdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      modalRef.close();
      location.reload();
    });
  }


  dischargeRevert() {
    this.openModal_DischargeRevert();
  }

  private openModal_DischargeRevert() {
    const modalRef = this.modalService.open(DischargeRevertFormComponent, { backdrop: 'static', size: 'md', scrollable: true });
    modalRef.componentInstance.ipdPatientId = this.opdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      modalRef.close();
      location.reload();
    });
  }
}
