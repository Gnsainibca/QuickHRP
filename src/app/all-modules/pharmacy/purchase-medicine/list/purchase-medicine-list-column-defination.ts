
import { DatePipe } from '@angular/common';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';

export function getColumnDefinations(datePipe: DatePipe): ColDef[] {
  return [
    {
      field: "action",
      // pinned:left,
      headerTooltip: 'Action',
      width: 100,
      cellRenderer: GridActionButtonComponent,
      cellRendererParams: (params: ICellRendererParams) => {
        params.data.id
      }
    },
    { field: "id", headerName: 'Bill No', headerTooltip: 'Bill No', width: 100, tooltipField: 'id'},
    { field: "billNo", headerName : 'Pharmacy Purchase No', headerTooltip: 'Pharmacy Purchase No', minWidth : 200, flex:1, tooltipField: 'billNo'},
    {
      field: "purchaseDate", headerTooltip: 'Purchase Date', headerName : 'Purchase Date',minWidth : 180, flex:1, tooltipField: 'purchaseDate', filter: 'agDateColumnFilter',
      valueFormatter: function (params) {
        return datePipe.transform(params.value, "MMM dd, yyyy hh:mm a")!;
      },
      // add extra parameters for the date filter
      filterParams: {
        // provide comparator function
        comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {
          const dateAsString = datePipe.transform(new Date(cellValue), "MM/dd/yyyy");

          if (dateAsString == null) {
            return 0;
          }

          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          const dateParts = dateAsString.split('/');
          const year = Number(dateParts[2]);
          const month = Number(dateParts[0]) - 1;
          const day = Number(dateParts[1]);
          const cellDate = new Date(year, month, day);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        }
      }
    },
    { field: "supplier", headerTooltip: 'Supplier Name', minWidth : 200, flex:1, tooltipField: 'supplier', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' }  },
    { field: "totalAmount", headerName : 'Amount (Rs)', headerTooltip: 'Amount (Rs)', width: 120, tooltipField: 'totalAmount' },
    { field: "discount", headerName : 'Discount (Rs)', headerTooltip: 'Discount (Rs)', width: 120, tooltipField: 'discount' },
    { field: "totalTax", headerName : 'Tax (Rs)', headerTooltip: 'Tax (Rs)', width: 100, tooltipField: 'totalTax' },
    { field: "netAmount", headerName : 'Net Amount (Rs)', headerTooltip: 'Net Amount (Rs)', width: 150, tooltipField: 'netAmount' },
  ];
}