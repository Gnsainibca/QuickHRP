
import { DatePipe } from '@angular/common';
import { left } from '@popperjs/core';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

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
    { field: "patientName", headerTooltip: 'Patient Name', width: 180, tooltipField: 'patientName', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "appointmentNo", headerTooltip: 'Appointment No', width: 150, tooltipField: 'appointmentNo'},
    {
      field: "appointmentDate", headerTooltip: 'Appointment Date', headerName: 'Date', width: 150, tooltipField: 'appointmentDate', filter: 'agDateColumnFilter',
      valueFormatter: function (params) {
        return datePipe.transform(params.value, APP_CONSTANT.dateFormat)!;
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
    { field: "phone", headerTooltip: 'Phone', width: 120, tooltipField: 'phone' },
    { field: "gender", headerTooltip: 'Gender', width: 100, tooltipField: 'gender' },
    { field: "doctor", headerTooltip: 'Doctor', width: 180, tooltipField: 'doctor', filter : 'doctor',
      autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "source", headerTooltip: 'Source', width: 100, tooltipField: 'source' },
    { field: "priority", headerTooltip: 'Priority', width: 100, tooltipField: 'priority' },
    {
      field: "liveConsultant", headerTooltip: 'Live Consultant', width: 180, tooltipField: 'liveConsultant',
      cellRendererParams: (params: ICellRendererParams) => {
        params.data.liveConsultant ? 'Yes' : 'No'
      }
    },
    { field: "alternateAddress", headerTooltip: 'Alternate Address', width: 250, tooltipField: 'alternateAddress', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    { field: "discount", headerTooltip: 'Discount', headerName: "Discount (%)", width: 120, tooltipField: 'discount' },
    { field: "fees", headerTooltip: 'Fees', headerName: "Fees (Rs)", width: 100, tooltipField: 'fees' },
    { field: "status", headerTooltip: 'Status', width: 100, tooltipField: 'status' }
  ];
}