import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  standalone: true,
  template: `
  <i (click)="addBadStock(id)" style="cursor:pointer;" class="fas fa-minus-square" data-bs-toggle="tooltip" title="Add Bad Stock"></i>
`,
  imports: [CommonModule]
})
export class CustomActionButtonComponent implements ICellRendererAngularComp {
  private parentComponent!: any;
  public id: any;
  constructor() { }

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.id = params.data.id;
    this.parentComponent = params.context;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  public addBadStock(id: number) {
    this.parentComponent.addBadStock(id);
  }
}
