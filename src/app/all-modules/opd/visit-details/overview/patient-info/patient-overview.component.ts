import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.scss']
})
export class PatientOverviewComponent {

  public patient = {
    name : 'Vijay Kumar (2338)', gender : 'Male', age : '28 Year 2 Month 14 Days', guardianName : 'Dharampal Singh',
    phone : '9990935485', tpa : '	Health Life Insurance', tpaId : 788909678, tpaValidity : '29 Dec, 2024', barCode : '', qrCode : ''
  };

  constructor() { }

  ngOnInit() {

  }
}
