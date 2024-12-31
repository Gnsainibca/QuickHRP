import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { IpdBedHistory } from '../../../shared/models/ipd-bed-history';
import { IpdDataService } from '../../../shared/servives/Ipd.service';

@Component({
  selector: 'app-ipd-bed-history-overview',
  templateUrl: './ipd-bed-history-overview.component.html',
  styleUrls: ['./ipd-bed-history-overview.component.scss']
})
export class IPDBedHistoryOverviewComponent {
  @Input() ipdPatientId : number = 0;
  public routes = routes;
  public bedHistories: Array<IpdBedHistory> = [];
  
  constructor(private service: IpdDataService) { }

  ngOnInit() {
    this.bedHistories = this.service.getBedHistoryList(this.ipdPatientId).sort((a, b) => b.id - a.id);
  }
}
