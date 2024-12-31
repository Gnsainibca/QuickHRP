import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { IpdDataService } from '../../../shared/servives/Ipd.service';

@Component({
  selector: 'app-ipd-lab-investigation-overview',
  templateUrl: './ipd-lab-investigation-overview.component.html',
  styleUrls: ['./ipd-lab-investigation-overview.component.scss']
})
export class IPDLabInvestigationOverviewComponent {
  @Input() ipdPatientId : number = 0;
  public routes = routes;
  public tests: Array<any> = [];
  
  constructor(private service: IpdDataService) { }

  ngOnInit() {
    this.tests = this.service.getLabInvertigationList(this.ipdPatientId);
  }
}
