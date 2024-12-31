import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tab } from 'src/app/shared/enums/tab';
import { IpdDataService } from '../shared/servives/Ipd.service';

@Component({
  selector: 'app-ipd-details',
  templateUrl: './ipd-details.component.html',
  styleUrls: ['./ipd-details.component.scss']
})
export class IPDDetailsComponent {

  tab = Tab;
  public selectedTab: Tab = Tab.Overview;
  public ipdPatientId: number = 0;
  public hasPatientDischarged : boolean = false;
  @ViewChild('target') inputMessageRef !: ElementRef;

  constructor(private route: ActivatedRoute, private ipdService : IpdDataService) { }

  ngOnInit() {
    this.ipdPatientId = this.route.snapshot.params['id']!;
    this.hasPatientDischarged = this.ipdService.getIpdPatientById(this.ipdPatientId)?.dischargeStatusId! > 0;
    const urlTab: string = this.route.snapshot.params['tab']!;
    if (urlTab) {
      this.selectedTab = Tab[urlTab as keyof typeof Tab];
    }
    this.scroll();
  }

  scroll() {
    this.inputMessageRef?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
  }
}
