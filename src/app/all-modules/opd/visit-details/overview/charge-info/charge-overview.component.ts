import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { OpdDataService } from '../../../shared/services/opd.service';
import { PatientCharge } from '../../../shared/models/patient-charge';

@Component({
  selector: 'app-charge-overview',
  templateUrl: './charge-overview.component.html',
  styleUrls: ['./charge-overview.component.scss']
})
export class ChargeOverviewComponent {
  @Input() opdPatientId: number = 0;
  public routes = routes;
  public charges: Array<PatientCharge> = []

  constructor(private opdDataService: OpdDataService) { }

  ngOnInit() {
    this.charges = this.opdDataService.getChargeList(this.opdPatientId);
  }
}
