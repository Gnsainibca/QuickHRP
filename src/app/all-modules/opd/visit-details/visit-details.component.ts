import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tab } from 'src/app/shared/enums/tab';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss']
})
export class VisitDetailsComponent {

  tab = Tab;
  public selectedTab: Tab = Tab.Overview;
  public opdPatientId: number = 0;
  @ViewChild('target') inputMessageRef !: ElementRef;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.opdPatientId = this.route.snapshot.params['id']!;
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
