import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { IpdPrescriptionList } from '../../../shared/models/ipd-prescription';

@Component({
  selector: 'app-ipd-prescription-overview',
  templateUrl: './ipd-prescription-overview.component.html',
  styleUrls: ['./ipd-prescription-overview.component.scss']
})
export class IPDPrescriptionOverviewComponent {
  @Input() ipdPatientId: number = 0;
  public routes = routes;
  public prescriptionList: Array<IpdPrescriptionList> = [];

  constructor(private service: IpdDataService) { }

  ngOnInit() {
    this.prescriptionList = this.service.getPrescriptionList(this.ipdPatientId).sort((a, b) => b.id - a.id);
  }
}
