import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { IpdPrescriptionView } from '../../../shared/models/ipd-prescription';
import { CommonService } from 'src/app/shared/data/common.service';
import { PatientList } from 'src/app/shared/models/patient';

@Component({
  selector: 'app-ipd-prescription-view',
  templateUrl: './ipd-prescription-view.component.html',
  styleUrls: ['./ipd-prescription-view.component.scss']
})
export class IpdPrescriptionViewComponent {
  
  @Input() id: number = 0;
  @Input() ipdPatientId: number = 0;
  prescription !: IpdPrescriptionView;
  @Output() onEdit = new EventEmitter<number>();
  patient !: PatientList;

  constructor(public activeModal: NgbActiveModal, private ipdService: IpdDataService, 
    private commonService: CommonService) {
  }

  ngOnInit() {
    this.prescription = this.ipdService.getPrescriptionById(this.id);
    let ipdPatient = this.ipdService.getIpdPatientById(this.ipdPatientId);
    this.patient = this.commonService.getPatientById(ipdPatient.patientId)!;
  }

  edit(){
    this.onEdit.next(this.prescription.id);
  }
}
