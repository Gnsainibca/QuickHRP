import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/shared/data/common.service';
import { PatientList } from 'src/app/shared/models/patient';
import { OpdDataService } from '../../../shared/services/opd.service';

@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.scss']
})
export class PatientOverviewComponent {

  @Input() opdPatientId: number = 0;
  public   patient !: PatientList;

  constructor(private commonService: CommonService, private opdService : OpdDataService) { }

  ngOnInit() {
    let ipdPatient = this.opdService.getOpdPatientById(this.opdPatientId);
    this.patient = this.commonService.getPatientById(ipdPatient.patientId)!;
  }
}
