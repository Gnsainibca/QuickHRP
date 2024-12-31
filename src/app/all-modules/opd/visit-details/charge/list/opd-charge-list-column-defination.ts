import { DatePipe } from '@angular/common';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

export function getColumnDefinations(datePipe: DatePipe): ColDef[] {
    return [
        // { field: "id"},
        {
            field: "action",
            width: 80,
            cellRenderer: GridActionButtonComponent,
            cellRendererParams: (params: ICellRendererParams) => {
                return {
                    data: {
                        id: params.data.id,
                        showView: false
                    }
                }
            }
        },
        {
            field: "date", headerTooltip: 'Date', width: 120, tooltipField: 'date',
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
        { field: "chargeType", headerTooltip: 'Charge Type', filter: true, width: 130, tooltipField: 'chargeType', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "chargeCategory", headerTooltip: 'Charge Category', width: 150, tooltipField: 'chargeCategory', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "charge", headerTooltip: 'Charge', width: 150, filter: true, tooltipField: 'charge', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "standardCharge", headerTooltip: 'StandardCharge', width: 150 },
        { field: "quantity", headerTooltip: 'Quantity', width: 120 },
        { field: "tpaCharge", headerTooltip: 'Tpa Charge', width: 120 },
        { field: "discountPercentage", headerTooltip: 'Discount (%)', width: 120, headerName: 'Discount (%)' },
        { field: "tax", headerTooltip: 'Tax', width: 70 },
        { field: "netAmount", headerTooltip: 'Net Amount', width: 120 },
        { field: "note", headerTooltip: 'Note', width: 300, tooltipField: 'note', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    ];
}