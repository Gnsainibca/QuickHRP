import { DatePipe } from '@angular/common';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

export function getIpdPatientColumnDefinations(datePipe: DatePipe): ColDef[] {
    return [
        {
            field: "ipdNo", headerName : 'IPD No', headerTooltip: 'Ipd No', width: 150, tooltipField: 'ipdNo',
            cellRenderer: function (params: ICellRendererParams) {
                return `<a href="/ipd/patient/${params.data.id}/Overview">${params.data.ipdNo}</a>`
            }
        },
        { field: "caseId", headerTooltip: 'Case Id', width: 150, tooltipField: 'caseId', headerName: 'Case Id' },
        {
            field: "appointmentDate", headerName : 'Date', headerTooltip: 'Date', width: 170, tooltipField: 'appointmentDate',
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
        { field: "consultantDoctor", headerTooltip: 'Doctor', width: 180, filter: true, tooltipField: 'consultantDoctor', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "symptomsDescription", headerTooltip: 'Symptoms', flex: 1, tooltipField: 'symptomsDescription', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "findingsDescription", headerTooltip: 'Findings', flex: 1, tooltipField: 'findingsDescription', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    ];
}