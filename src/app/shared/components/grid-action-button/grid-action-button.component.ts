import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  standalone: true,
  template: `
  <i (click)="view(id)" style="cursor:pointer;" *ngIf="showView" class="fa fa-align-justify" data-bs-toggle="tooltip" title="View"></i>
  <i (click)="edit(id)" style="padding-left: 10px;cursor:pointer;" *ngIf="showEdit" class="fa fa-edit" data-bs-toggle="tooltip" title="Edit"></i>
  <i (click)="delete(id)" style="padding-left: 10px;cursor:pointer;" *ngIf="showDelete" class="fa fa-trash" data-bs-toggle="tooltip" title="Delete"></i>
`,
  imports: [CommonModule]
})
export class GridActionButtonComponent implements ICellRendererAngularComp {
  private parentComponent!: any;
  public id: any;
  public showView: boolean = true;
  public showEdit: boolean = true;
  public showDelete: boolean = true;
  constructor() { }

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.id = params.data.id;
    if (params.data.showView !== undefined) {
      this.showView = params.data.showView;
    }
    if (params.data.showEdit !== undefined) {
      this.showEdit = params.data.showEdit;
    }
    if (params.data.showDelete !== undefined) {
      this.showDelete = params.data.showDelete;
    }
    this.parentComponent = params.context;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  public view(id: number) {
    this.parentComponent.view(id);
  }

  public edit(id: number) {
    this.parentComponent.edit(id);
  }

  public delete(id: number) {
    this.parentComponent.delete(id);
  }
}
