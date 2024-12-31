import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { IpdDataService } from '../../shared/servives/Ipd.service';
import { IpdPatientList } from '../../shared/models/ipd-patient-list';
import { getColumnDefinations } from './ipd-discharged-patient-list-column-defination';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-discharged-patient-ipd-list',
  templateUrl: './ipd-discharged-patient-list.component.html',
  styleUrls: ['./ipd-discharged-patient-list.component.scss']
})
export class IPDDischargedPatientListComponent {
  public ipdPatientList: Array<IpdPatientList> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
   public routes = routes;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);

  constructor(private datePipe: DatePipe, private service: IpdDataService) { }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  private getList(): void {
    this.ipdPatientList = this.service.getIpdDischargedPatientList().sort((a, b) => b.id - a.id);
  }
}
