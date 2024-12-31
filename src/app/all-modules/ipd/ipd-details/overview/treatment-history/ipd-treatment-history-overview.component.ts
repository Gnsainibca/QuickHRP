import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { IpdPatientList } from '../../../shared/models/ipd-patient-list';
import { IpdDataService } from '../../../shared/servives/Ipd.service';

@Component({
  selector: 'app-ipd-treatment-history-overview',
  templateUrl: './ipd-treatment-history-overview.component.html',
  styleUrls: ['./ipd-treatment-history-overview.component.scss']
})
export class IPDTreatmentHistoryOverviewComponent {
  @Input() ipdPatientId : number = 0;
  public routes = routes;
  public ipdPatientList: Array<IpdPatientList> = [];
  
  constructor(private service : IpdDataService) { }

  ngOnInit() {
    this.ipdPatientList = this.service.getIpdPatientsTreatmentHistory(this.ipdPatientId).sort((a, b) => b.id - a.id);
  }
}
