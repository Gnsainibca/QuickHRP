
import { DatePipe } from '@angular/common';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';

export function getPathologyColumnDefinations(datePipe: DatePipe): ColDef[] {
  return [
    { field: "billNo", headerTooltip: 'Bill No', width: 180, tooltipField: 'billNo', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    {
      field: "date", headerTooltip: 'Report Date', headerName : 'Report Date',width: 200, tooltipField: 'date', filter: 'agDateColumnFilter',
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
    { field: "doctor", headerName : 'Reference Doctor', headerTooltip: 'Reference Doctor', minWidth: 200, flex : 1, tooltipField: 'doctor', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "totalAmount", headerName : 'Amount (Rs)', headerTooltip: 'Amount (Rs)', minWidth: 120, flex : .7, tooltipField: 'totalAmount' },
    { field: "discount", headerName : 'Discount (%)', headerTooltip: 'Discount (%)', minWidth: 120, flex : .7, tooltipField: 'discount' },
    { field: "totalTax", headerName : 'Tax (%)', headerTooltip: 'Tax (%)', minWidth: 100, flex : .7, tooltipField: 'totalTax' },
    { field: "netAmount", headerName : 'Paid Amount (Rs)', headerTooltip: 'Paid Amount (Rs)', minWidth: 150, flex : .7, tooltipField: 'netAmount' },
  ];
}