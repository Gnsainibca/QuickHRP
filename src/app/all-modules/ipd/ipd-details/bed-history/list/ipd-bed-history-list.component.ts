import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { routes } from 'src/app/shared/core.index';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { IpdBedHistory } from '../../../shared/models/ipd-bed-history';
import { getColumnDefinations } from './ipd-bed-history-list-column-defination';

@Component({
  selector: 'app-ipd-bed-history',
  templateUrl: './ipd-bed-history-list.component.html',
  styleUrls: ['./ipd-bed-history-list.component.scss']
})
export class IPDBedHistoryListComponent {
  public bedHistories: Array<IpdBedHistory> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  private ipdPatientId: number = 0;
  public routes = routes;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private data: IpdDataService) {
    this.ipdPatientId = this.route.snapshot.params['id']!;
  }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  private getList(): void {
    this.bedHistories = this.data.getBedHistoryList(this.ipdPatientId).sort((a, b) => b.id - a.id);
  }
}
