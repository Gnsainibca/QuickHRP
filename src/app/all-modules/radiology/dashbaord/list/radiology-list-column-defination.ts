
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
    { field: "billNo", headerTooltip: 'Bill No', width: 150, tooltipField: 'billNo', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "caseId", headerTooltip: 'Case Id', width: 150, tooltipField: 'caseId', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    {
      field: "date", headerTooltip: 'Report Date', headerName : 'Report Date',width: 180, tooltipField: 'date', filter: 'agDateColumnFilter',
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
    { field: "patientName", headerTooltip: 'Patient Name', width: 200, tooltipField: 'patientName', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' }  },
    { field: "doctor", headerName : 'Reference Doctor', headerTooltip: 'Reference Doctor', width: 200, tooltipField: 'doctor', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "totalAmount", headerName : 'Amount (Rs)', headerTooltip: 'Amount (Rs)', width: 120, tooltipField: 'totalAmount' },
    { field: "discount", headerName : 'Discount (%)', headerTooltip: 'Discount (%)', width: 120, tooltipField: 'discount' },
    { field: "totalTax", headerName : 'Tax (%)', headerTooltip: 'Tax (%)', width: 100, tooltipField: 'totalTax' },
    { field: "netAmount", headerName : 'Paid Amount (Rs)', headerTooltip: 'Paid Amount (Rs)', width: 150, tooltipField: 'netAmount' },
  ];
}