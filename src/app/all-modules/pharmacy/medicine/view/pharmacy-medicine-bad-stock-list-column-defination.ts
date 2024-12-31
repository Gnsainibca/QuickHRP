
import { DatePipe } from '@angular/common';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

export function getBacStockGridColumnDefinations(datePipe: DatePipe): ColDef[] {
  return [
    {
      field: "action",
      headerTooltip: 'Action',
      width: 100,
      cellRenderer: GridActionButtonComponent,
      cellRendererParams: (params: ICellRendererParams) => {
        return {
          data: {
            id: params.data.id,
            showView: false,
            showEdit: false,
          }
        }
      }
    },
    {
      field: "outwardDate", headerName: 'Outward Date', headerTooltip: 'Outward Date', minWidth: 120, flex: 1, tooltipField: 'outwardDate', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' },
      cellRenderer: (params: ICellRendererParams) => {
        return datePipe.transform(params.value, APP_CONSTANT.dateFormat)!;
      }
    },
    { field: "batchNo", headerName: 'Batch No', headerTooltip: 'Batch No', minWidth: 100, flex: 1, tooltipField: 'batchNo', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    {
      field: "expiryDate", headerName: 'Expiry Date', headerTooltip: 'Expiry Date', minWidth: 120, flex: 1, tooltipField: 'expiryDate', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' },
      cellRenderer: (params: ICellRendererParams) => {
        return datePipe.transform(params.value, "MMM, yyyy")!;
      }
    },
    { field: "quantity", headerName: 'Quantity', headerTooltip: 'Quantity', minWidth: 100, flex: 1, tooltipField: 'quantity', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
  ];
}