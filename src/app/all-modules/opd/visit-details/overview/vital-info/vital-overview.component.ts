import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { OpdDataService } from '../../../shared/services/opd.service';
import { PatientVital } from '../../../shared/models/vital';
import { VitalStatus } from 'src/app/shared/enums/vital-status';
import { VitalSetupService } from 'src/app/all-modules/setup/vital/shared/services/vital-setup.service';

@Component({
  selector: 'app-vital-overview',
  templateUrl: './vital-overview.component.html',
  styleUrls: ['./vital-overview.component.scss']
})
export class VitalOverviewComponent {
  @Input() opdPatientId: number = 0;
  public routes = routes;
  public vitals?: Array<PatientVital>;
  public vitalStatus = VitalStatus;

  constructor(private opdDataService: OpdDataService, private vitalSetupService : VitalSetupService) { }

  ngOnInit() {
    this.vitals = this.opdDataService.getOptPatientCurrentVital(this.opdPatientId);
  }

  getVitalRange(item: PatientVital) {
    return this.vitalSetupService.getNameWithVitalRange(item);
  }
}
