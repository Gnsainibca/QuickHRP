import { Component } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { ActivatedRoute } from '@angular/router';
import { OpdDataService } from '../../../shared/services/opd.service';

@Component({
  selector: 'app-opd-lab-investigation-list',
  templateUrl: './opd-lab-investigation-list.component.html',
  styleUrls: ['./opd-lab-investigation-list.component.scss']
})
export class OPDLabInvestigationListComponent {
  public tests: Array<any> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  private opdPatientId : number = 0;
  public routes = routes;

  constructor(private route: ActivatedRoute, private service: OpdDataService) { 
    this.opdPatientId = this.route.snapshot.params['id']!;
  }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }
  
  private getList(): void {
    this.tests = this.service.getLabInvertigationList(this.opdPatientId);
  }
}
