import { Component, Input } from '@angular/core';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { BedSetupService } from 'src/app/all-modules/setup/bed/shared/services/bed-setup.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexResponsive,
  ApexFill,
} from "ng-apexcharts";
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  legend: ApexLegend | any;
  tooltip: ApexTooltip | any;
  responsive: ApexResponsive[] | any;
  fill: ApexFill | any;
  labels: string[] | any;
  colors: any;
  markers: any;
  subtitle: any;
};

@Component({
  selector: 'app-ipd-info-overview',
  templateUrl: './ipd-info-overview.component.html',
  styleUrls: ['./ipd-info-overview.component.scss']
})
export class IPDInfoOverviewComponent {
  @Input() ipdPatientId: number = 0;
  public caseId: string = '';
  public ipdNo: string = '';
  public admissionDate !: Date;
  public dischargeDate !: Date;
  public bed: string = '';
  public usedCreditLimit: number = 0;
  public creditLimit: number = 0;
  public balanceCreditLimit: number = 0;

  public chartOptionsOne: Partial<ChartOptions>;

  constructor(private service: IpdDataService, private bedSetupService: BedSetupService, private opdService: OpdDataService) {
    this.chartOptionsOne = {
      series: [30, 70],
      chart: {
        width: 400,
        type: 'pie'
      },
      labels: ['Used Credit Limit', 'Balance Credit Limit'],
      colors: ['#FF0000', '#218925'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: '180px',
              width: '100%',
            },
            legend: {
              position: 'bottom'
            },
          },
        },
      ],
    };
  }

  ngOnInit() {
    let ipdPatient = this.service.getIpdPatientById(this.ipdPatientId);
    this.caseId = ipdPatient.caseId;
    this.ipdNo = ipdPatient.ipdNo;
    this.admissionDate = ipdPatient.appointmentDate;
    this.dischargeDate = ipdPatient.dischargeDate!;
    this.bed = this.service.getBedByIpdPatientId(this.ipdPatientId);
    this.creditLimit = ipdPatient.creditLimit;
    this.usedCreditLimit = this.opdService.getChargeList(this.ipdPatientId).reduce((sum, current) => sum + current.netAmount, 0);
    this.balanceCreditLimit = this.creditLimit - this.usedCreditLimit;
    this.chartOptionsOne.series = [this.usedCreditLimit, this.balanceCreditLimit];
    // this.chartOptionsOne.labels = [`Used Credit Limit: ${this.usedCreditLimit}`, `Balance Credit Limit: ${this.balanceCreditLimit}`, `Credit Limit: ${this.creditLimit}`];
  }
}
