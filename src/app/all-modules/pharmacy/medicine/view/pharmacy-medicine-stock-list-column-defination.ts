
import { DatePipe } from '@angular/common';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

export function getColumnDefinations(datePipe: DatePipe): ColDef[] {
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
            showDelete: false,
          }
        }
      }
    },
    {
      field: "purchaseDate", headerName: 'Inward Date', headerTooltip: 'Inward Date', minWidth: 120, flex: 1, tooltipField: 'purchaseDate', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' },
      cellRenderer: (params: ICellRendererParams) => {
        return datePipe.transform(params.value, APP_CONSTANT.dateFormat)!;
      }
    },
    { field: "batchNo", headerName: 'Batch No', headerTooltip: 'Batch No', minWidth: 100, flex: 1, tooltipField: 'batchNo', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "purchaseBillNo", headerName: 'Purchase No', headerTooltip: 'Purchase No', minWidth: 120, flex: 1, tooltipField: 'purchaseBillNo', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    {
      field: "expiryDate", headerName: 'Expiry Date', headerTooltip: 'Expiry Date', minWidth: 120, flex: 1, tooltipField: 'expiryDate', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' },
      cellRenderer: (params: ICellRendererParams) => {
        return datePipe.transform(params.value, "MMM, yyyy")!;
      }
    },
    { field: "packingQuantity", headerName: 'Packing Qty', headerTooltip: 'Packing Qty', minWidth: 100, flex: 1, tooltipField: 'packingQuantity', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "purchasePrice", headerName: 'Purchase Price', headerTooltip: 'Purchase Price', minWidth: 100, flex: 1, tooltipField: 'purchasePrice', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "amount", headerName: 'Amount', headerTooltip: 'Amount', minWidth: 100, flex: 1, tooltipField: 'amount', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "quantity", headerName: 'Quantity', headerTooltip: 'Quantity', minWidth: 100, flex: 1, tooltipField: 'quantity', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "mrp", headerName: 'MRP', headerTooltip: 'MRP', minWidth: 100, flex: 1, tooltipField: 'mrp', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "salePrice", headerName: 'Sale Price', headerTooltip: 'Sale Price', minWidth: 100, flex: 1, tooltipField: 'salePrice', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
  ];
}