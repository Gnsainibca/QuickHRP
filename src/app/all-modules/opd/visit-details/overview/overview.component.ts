import { Component } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  public opdPatientId : number = 0;
  public routes = routes;
  constructor(private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.opdPatientId = this.route.snapshot.params['id']!;
  }
}
