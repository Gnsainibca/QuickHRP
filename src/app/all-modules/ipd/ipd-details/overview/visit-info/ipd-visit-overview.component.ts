import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/shared/core.index';
import { CommonService } from 'src/app/shared/data/common.service';
import { IpdDataService } from '../../../shared/servives/Ipd.service';

@Component({
  selector: 'app-ipd-visit-overview',
  templateUrl: './ipd-visit-overview.component.html',
  styleUrls: ['./ipd-visit-overview.component.scss']
})
export class IPDVisitOverviewComponent {
  @Input() ipdPatientId : number = 0;
  public anyKnownAllergies : string = '';
  public findings : Array<string> = [];
  public symptoms : string = '';
  public consultantDoctor : string = '';

  constructor(private ipdDataService : IpdDataService, private data : DataService, private commonService : CommonService) { }

  ngOnInit() {
    let ipdPatient = this.ipdDataService.getIpdPatientById(this.ipdPatientId);
    this.anyKnownAllergies = ipdPatient.anyKnownAllergies;
    this.symptoms = ipdPatient.symptomsDescription; 

    this.findings = this.ipdDataService.getPrescriptionList(this.ipdPatientId).map(x=> x.findingDescription);

    let doctors = this.commonService.getDoctorsNameList();
    this.consultantDoctor = doctors.find(x => x.id == ipdPatient.consultantDoctorId)?.name!; // distinct
  }
}
