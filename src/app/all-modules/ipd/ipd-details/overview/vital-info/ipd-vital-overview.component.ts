import { Component, Input } from '@angular/core';
import { PatientVital } from 'src/app/all-modules/opd/shared/models/vital';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { VitalSetupService } from 'src/app/all-modules/setup/vital/shared/services/vital-setup.service';
import { routes } from 'src/app/shared/core.index';
import { VitalStatus } from 'src/app/shared/enums/vital-status';

@Component({
  selector: 'app-ipd-vital-overview',
  templateUrl: './ipd-vital-overview.component.html',
  styleUrls: ['./ipd-vital-overview.component.scss']
})
export class IPDVitalOverviewComponent {
  @Input() opdPatientId : number = 0;
  public routes = routes;
  public vitals ?: Array<PatientVital>;
  public vitalStatus = VitalStatus;
  
  constructor(private opdDataService : OpdDataService, private vitalSetupService : VitalSetupService) { }

  ngOnInit() {
    this.vitals = this.opdDataService.getOptPatientCurrentVital(this.opdPatientId);
  }

  getVitalRange(item : PatientVital) {
    return this.vitalSetupService.getNameWithVitalRange(item);
  }
}
