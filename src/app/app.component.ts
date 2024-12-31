import { Component } from '@angular/core';
import { DataService } from './shared/core.index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'template';

  constructor(private dataService: DataService) {
    this.dataService.getJsonData();
  }
}
