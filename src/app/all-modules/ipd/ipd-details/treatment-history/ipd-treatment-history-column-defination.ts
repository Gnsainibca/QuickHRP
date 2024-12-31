import { DatePipe } from '@angular/common';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

export function getColumnDefinations(datePipe: DatePipe, hasPatientDischarged :boolean): ColDef[] {
    return [
        {
            field: "action",
            hide : hasPatientDischarged,
            width: 100,
            cellRenderer: GridActionButtonComponent,
            cellRendererParams: (params: ICellRendererParams) => {
                return { data: { id: params.data.patientVisitId } }
            }
        },
        {
            field: "ipdNo", headerTooltip: 'Ipd No', width: 120, tooltipField: 'ipdNo',
            cellRenderer: function (params: ICellRendererParams) {
                return `<a href="/ipd/patient/${params.data.opdPatientId}" >${params.data.ipdNo}</a>`
            }
        },
        { field: "patientName", headerTooltip: 'Patient Name', filter: true, width: 150, tooltipField: 'patientName' },
        { field: "caseId", headerTooltip: 'Case Id', width: 120, tooltipField: 'caseId', headerName: 'Case Id' },
        {
            field: "appointmentDate", headerTooltip: 'Appointment Date', width: 170, tooltipField: 'appointmentDate',
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
        { field: "consultantDoctor", headerTooltip: 'Consultant Doctor', width: 170, filter: true, tooltipField: 'consultantDoctor' },
        { field: "reference", headerTooltip: 'Reference', width: 150, tooltipField: 'reference' },
        { field: "symptomsDescription", headerName: 'Symptoms', headerTooltip: 'Symptoms', width: 300, tooltipField: 'symptomsDescription', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "previousMedicalIssue", headerTooltip: 'Previous Medical Issue', width: 500, tooltipField: 'previousMedicalIssue', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } }
    ];
}