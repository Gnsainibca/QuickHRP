import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { OpdDataService } from '../../../shared/services/opd.service';
import { OperationList } from '../../../shared/models/operation';

@Component({
  selector: 'app-operation-overview',
  templateUrl: './operation-overview.component.html',
  styleUrls: ['./operation-overview.component.scss']
})
export class OperationOverviewComponent {
  @Input() opdPatientId : number = 0;
  public routes = routes;
  public operations : Array<OperationList> = []
  
  constructor(private opdDataService : OpdDataService) { }

  ngOnInit() {
    this.operations = this.opdDataService.getOperationList(this.opdPatientId);
  }
}
