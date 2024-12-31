import { Component, Input } from '@angular/core';
import { MedicationList } from 'src/app/all-modules/opd/shared/models/medication';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { routes } from 'src/app/shared/core.index';

@Component({
  selector: 'app-ipd-medication-overview',
  templateUrl: './ipd-medication-overview.component.html',
  styleUrls: ['./ipd-medication-overview.component.scss']
})
export class IPDMedicationOverviewComponent {
  @Input() opdPatientId : number = 0;
  public routes = routes;
  public medications : Array<MedicationList> = []
  
  constructor(private opdDataService : OpdDataService) { }

  ngOnInit() {
    this.medications =  this.opdDataService.getOptPatientMedication(this.opdPatientId);
  }
}
