import { DatePipe } from '@angular/common';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { SimpleRecord } from 'src/app/shared/models/simple-record';

export function getOpdPatientColumnDefinations(datePipe: DatePipe): ColDef[] {
    return [
        {
            field: "opdNo", headerTooltip: 'Opd No', width: 150, tooltipField: 'opdNo',
            cellRenderer: function (params: ICellRendererParams) {
                return `<a href="/opd/patient/visit-details/${params.data.opdPatientId}/Overview">${params.data.opdNo}</a>`
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
        { field: "consultantDoctor", headerTooltip: 'Consultant Doctor', width: 200, filter: true, tooltipField: 'consultantDoctor', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        {
            field: "symptomsDescription", headerTooltip: 'Symptoms', flex : 1, tooltipField: 'symptomsDescription', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' },
            cellRenderer: function (params: ICellRendererParams) {
                return (params.data.symptomsTypes as Array<SimpleRecord>).map(x => x.name).join(', ');
            }
        },
    ];
}