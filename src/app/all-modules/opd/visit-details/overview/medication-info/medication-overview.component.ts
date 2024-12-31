import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { OpdDataService } from '../../../shared/services/opd.service';
import { MedicationList } from '../../../shared/models/medication';

@Component({
  selector: 'app-medication-overview',
  templateUrl: './medication-overview.component.html',
  styleUrls: ['./medication-overview.component.scss']
})
export class MedicationOverviewComponent {
  @Input() opdPatientId: number = 0;
  public routes = routes;
  public medications: Array<MedicationList> = []

  constructor(private opdDataService: OpdDataService) { }

  ngOnInit() {
    this.medications = this.opdDataService.getOptPatientMedication(this.opdPatientId);
  }
}
