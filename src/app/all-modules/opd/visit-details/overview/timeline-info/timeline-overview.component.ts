import { Component, Input } from '@angular/core';
import { OpdDataService } from '../../../shared/services/opd.service';
import { Timeline } from '../../../shared/models/timeline';

@Component({
  selector: 'app-timeline-overview',
  templateUrl: './timeline-overview.component.html',
  styleUrls: ['./timeline-overview.component.scss']
})
export class TimelineOverviewComponent {
  @Input() opdPatientId: number = 0;
  public timelines: Array<Timeline> = [];

  constructor(private opdDataService: OpdDataService) { }

  ngOnInit() {
    this.timelines = this.opdDataService.getTimelineList(this.opdPatientId);
  }
}
