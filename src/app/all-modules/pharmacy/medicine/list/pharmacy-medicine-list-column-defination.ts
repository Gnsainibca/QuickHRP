
import { DatePipe } from '@angular/common';
import { right } from '@popperjs/core';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';
import { CustomActionButtonComponent } from './custom-action-button.component';
import { MedicineAvailability } from 'src/app/shared/enums/medicine-availability';

export function getColumnDefinations(datePipe: DatePipe): ColDef[] {
  return [
    {
      field: "action",
      headerTooltip: 'Action',
      width: 100,
      cellRenderer: GridActionButtonComponent,
      cellRendererParams: (params: ICellRendererParams) => {
        params.data.id
      }
    },
    { field: "name", headerName: 'Medicine Name', headerTooltip: 'Medicine Name', minWidth: 180, flex: 1, tooltipField: 'name', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "company", headerName: 'Medicine Company', headerTooltip: 'Medicine Company', minWidth: 180, flex: 1, tooltipField: 'company', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "composition", headerName: 'Medicine Composition', headerTooltip: 'Medicine Composition', minWidth: 180, flex: 1, tooltipField: 'composition', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "category", headerName: 'Medicine Category', headerTooltip: 'Medicine Category', minWidth: 200, flex: 1, tooltipField: 'category', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "group", headerName: 'Medicine Group', headerTooltip: 'Medicine Group', minWidth: 200, flex: 1, tooltipField: 'group', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "unit", width: 150, tooltipField: 'unit', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    {
      field: "availableQuantity", width: 150, tooltipField: 'availableQuantity', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' },
      cellRenderer: (params: ICellRendererParams) => {
        return params.data.availableQuantity  + '' + (params.data.status !== MedicineAvailability.available ? `<br/> <b><span class="${params.data.colorClass}">(${params.data.status})</span> </b>` : '') ;
      }
    },
    {
      field: "action",
      headerTooltip: 'Action',
      width: 60,
      cellRenderer: CustomActionButtonComponent,
      cellRendererParams: (params: ICellRendererParams) => {
        params.data.id
      },
      pinned: right
    },
  ];
}