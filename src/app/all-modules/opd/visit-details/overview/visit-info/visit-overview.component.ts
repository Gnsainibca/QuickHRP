import { Component, Input } from '@angular/core';
import { OpdDataService } from '../../../shared/services/opd.service';
import { DataService } from 'src/app/shared/core.index';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'app-visit-overview',
  templateUrl: './visit-overview.component.html',
  styleUrls: ['./visit-overview.component.scss']
})
export class VisitOverviewComponent {
  @Input() opdPatientId: number = 0;
  public knownAllergies: Array<string> = [];
  public symptoms: Array<string> = [];
  public consultantDoctors: Array<string> = [];

  constructor(private opdDataService: OpdDataService, private data: DataService, private commonService: CommonService) { }

  ngOnInit() {
    let patientVisits = this.opdDataService.getPatientVisits().filter(x => x.opdPatientId == this.opdPatientId);

    const knownAllergies = patientVisits.map(x => x.anyKnownAllergies);
    this.knownAllergies = [...new Set(knownAllergies.map(obj => obj))]; // distinct

    let symptoms = patientVisits.map(x => x.symptomsDescription);
    this.symptoms = [...new Set(symptoms.map(obj => obj))]; // distinct

    let consultantDoctorIds = patientVisits.map(x => x.consultantDoctorId);
    let doctors = this.commonService.getDoctorsNameList();
    this.consultantDoctors = [...new Set(consultantDoctorIds.map(consultantDoctorId => doctors.find(x => x.id == consultantDoctorId)?.name!))]; // distinct
  }
}
