import { Component } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ipd-overview',
  templateUrl: './ipd-overview.component.html',
  styleUrls: ['./ipd-overview.component.scss']
})
export class IPDOverviewComponent {
  public opdPatientId : number = 0;
  public routes = routes;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.opdPatientId = this.route.snapshot.params['id']!;
  }
}
