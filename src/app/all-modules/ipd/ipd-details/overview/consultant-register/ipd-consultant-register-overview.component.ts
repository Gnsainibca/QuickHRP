import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { ConsultantRegistration } from '../../../shared/models/consultant-register';
import { IpdDataService } from '../../../shared/servives/Ipd.service';

@Component({
  selector: 'app-ipd-consultant-register-overview',
  templateUrl: './ipd-consultant-register-overview.component.html',
  styleUrls: ['./ipd-consultant-register-overview.component.scss']
})
export class IPDConsultantRegisterOverviewComponent {
  @Input() ipdPatientId : number = 0;
  public routes = routes;
  public consultants: Array<ConsultantRegistration> = [];
  
  constructor(private data: IpdDataService) { }

  ngOnInit() {
    this.consultants = this.data.getConsultantRegistrationList(this.ipdPatientId).sort((a, b) => b.id - a.id);
  }
}
