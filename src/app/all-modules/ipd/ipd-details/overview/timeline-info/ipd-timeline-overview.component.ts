import { Component, Input } from '@angular/core';
import { Timeline } from 'src/app/all-modules/opd/shared/models/timeline';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';

@Component({
  selector: 'app-ipd-timeline-overview',
  templateUrl: './ipd-timeline-overview.component.html',
  styleUrls: ['./ipd-timeline-overview.component.scss']
})
export class IPDTimelineOverviewComponent {
  @Input() opdPatientId : number = 0;
  public timelines : Array<Timeline> = [];

  constructor(private opdDataService : OpdDataService) { }

  ngOnInit() {
    this.timelines = this.opdDataService.getTimelineList(this.opdPatientId);
  }
}
