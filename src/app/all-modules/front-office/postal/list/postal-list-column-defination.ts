import { DatePipe } from '@angular/common';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

export function getColumnDefinations(datePipe: DatePipe): ColDef[] {
    return [
        // { field: "id"},
        {
            field: "action",
            width: 100,
            cellRenderer: GridActionButtonComponent,
            cellRendererParams: (params: ICellRendererParams) => {
                params.data.id
            }
        },
        { field: "fromTitle", headerTooltip: 'From Title', filter: true, flex: 1, tooltipField: 'fromTitle', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "referenceNo", headerTooltip: 'Reference No', filter: true, flex: 1, tooltipField: 'referenceNo' },
        { field: "toTitle", headerTooltip: 'To Title', flex: 1, tooltipField: 'toTitle', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "type", headerTooltip: 'Type', flex: 1, tooltipField: 'type' },
        {
            field: "date", headerTooltip: 'Date', width: 150, tooltipField: 'date',
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
        { field: "address", headerTooltip: 'Address', width: 200, tooltipField: 'address', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } }
    ];
}