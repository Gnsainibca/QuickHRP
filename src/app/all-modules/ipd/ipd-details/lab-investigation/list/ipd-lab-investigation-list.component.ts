import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { ActivatedRoute } from '@angular/router';
import { IpdDataService } from '../../../shared/servives/Ipd.service';

@Component({
  selector: 'app-ipd-lab-investigation-list',
  templateUrl: './ipd-lab-investigation-list.component.html',
  styleUrls: ['./ipd-lab-investigation-list.component.scss']
})
export class IPDLabInvestigationListComponent {
  public tests: Array<any> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  private ipdPatientId : number = 0;
  public routes = routes;

  constructor(private route: ActivatedRoute, private service: IpdDataService) { 
    this.ipdPatientId = this.route.snapshot.params['id']!;
  }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }
  
  private getList(): void {
    this.tests = this.service.getLabInvertigationList(this.ipdPatientId);
  }
}
