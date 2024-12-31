import { DatePipe } from '@angular/common';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

export function getColumnDefinations(datePipe: DatePipe): ColDef[] {
    return [
        {
            field: "ipdNo", headerTooltip: 'Ipd No', minWidth: 130, flex: .7, tooltipField: 'ipdNo',
            cellRenderer: function (params: ICellRendererParams) {
                return `<a href="/ipd/patient/${params.data.id}/Overview">${params.data.ipdNo}</a>`
            }
        },
        { field: "caseId", headerTooltip: 'Case Id', minWidth: 140, flex: .7, tooltipField: 'caseId', headerName: 'Case Id' },
        { field: "patientName", headerTooltip: 'Patient Name', filter: true, minWidth: 180, flex: 1, tooltipField: 'patientName', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "gender", filter: true, width: 110, autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "phone", filter: true, width: 130, autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "consultantDoctor", headerTooltip: 'Consultant Doctor', minWidth: 180, flex: 1, filter: true, tooltipField: 'consultantDoctor', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        {
            field: "appointmentDate", headerName: 'Admission Date', headerTooltip: 'Admission Date', width: 170, tooltipField: 'appointmentDate',
            valueFormatter: function (params) {
                return datePipe.transform(params.value, APP_CONSTANT.dateFormat)!;
            }, filter: 'agDateColumnFilter',
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
        {
            field: "dischargeDate", headerName: 'Discharged Date', headerTooltip: 'Discharged Date', width: 170, tooltipField: 'dischargeDate',
            valueFormatter: function (params) {
                return datePipe.transform(params.value, APP_CONSTANT.dateFormat)!;
            }, filter: 'agDateColumnFilter',
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
        }
    ];
}