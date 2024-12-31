import { Component, Input } from '@angular/core';
import { OperationList } from 'src/app/all-modules/opd/shared/models/operation';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { routes } from 'src/app/shared/core.index';

@Component({
  selector: 'app-ipd-operation-overview',
  templateUrl: './ipd-operation-overview.component.html',
  styleUrls: ['./ipd-operation-overview.component.scss']
})
export class IPDOperationOverviewComponent {
  @Input() opdPatientId : number = 0;
  public routes = routes;
  public operations : Array<OperationList> = [];
  
  constructor(private opdDataService : OpdDataService) { }

  ngOnInit() {
    this.operations = this.opdDataService.getOperationList(this.opdPatientId);
  }
}
