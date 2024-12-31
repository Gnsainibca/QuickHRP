
import { DatePipe } from '@angular/common';
import { left } from '@popperjs/core';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';

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
    { field: "name", headerName : 'Test Name', headerTooltip: 'Test Name', width: 180, tooltipField: 'name', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "shortName", headerTooltip: 'Short Name', width: 120, tooltipField: 'shortName', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' }  },
    { field: "type", headerName : 'Test Type', headerTooltip: 'Test Type', width: 150, tooltipField: 'type', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' }  },
    { field: "category", headerTooltip: 'Category', width: 200, tooltipField: 'category', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' }  },
    { field: "subCategory", headerTooltip: 'Sub Category', width: 200, tooltipField: 'subCategory', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' }  },
    { field: "reportDays", headerTooltip: 'Report Days', width: 120, tooltipField: 'reportDays' },
    { field: "chargeCategory", headerTooltip: 'Charge Category', width: 200, tooltipField: 'chargeCategory', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' }  },
    { field: "charge", headerTooltip: 'Charge', width: 200, tooltipField: 'charge', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' }  },
    { field: "amount",headerName : 'Amount (Rs)', headerTooltip: 'Amount', width: 120, tooltipField: 'amount' },
    { field: "tax", headerName : 'Tax (%)',headerTooltip: 'Tax', width: 120, tooltipField: 'tax' },
    { field: "netAmount",headerName : 'Total Amount (Rs)', headerTooltip: 'Total Amount', width: 150, tooltipField: 'netAmount' },
  ];
}