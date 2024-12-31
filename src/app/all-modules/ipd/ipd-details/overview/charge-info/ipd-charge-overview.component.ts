import { Component, Input } from '@angular/core';
import { PatientCharge } from 'src/app/all-modules/opd/shared/models/patient-charge';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { routes } from 'src/app/shared/core.index';

@Component({
  selector: 'app-ipd-charge-overview',
  templateUrl: './ipd-charge-overview.component.html',
  styleUrls: ['./ipd-charge-overview.component.scss']
})
export class IPDChargeOverviewComponent {
  @Input() opdPatientId : number = 0;
  public routes = routes;
  public charges : Array<PatientCharge> = []
  
  constructor(private opdDataService : OpdDataService) { }

  ngOnInit() {
    this.charges = this.opdDataService.getChargeList(this.opdPatientId);
  }
}
