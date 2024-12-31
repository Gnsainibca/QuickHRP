import { DatePipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

export function getColumnDefinations(datePipe: DatePipe): ColDef[] {
    return [
        { field: "bedGroup", headerTooltip: 'bedGroup', flex: 1, tooltipField: 'bedGroup' },
        { field: "bed", headerTooltip: 'bed', flex: 1, tooltipField: 'bed' , headerName : 'Bed' },
        {
            field: "fromDate", headerTooltip: 'fromDate', flex: 1, tooltipField: 'fromDate',
            valueFormatter: function (params) {
                return datePipe.transform(params.value, APP_CONSTANT.dateTimeFormat)!;
            },
            filter: 'agDateColumnFilter',
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
            field: "toDate", headerTooltip: 'toDate', flex: 1, tooltipField: 'toDate',
            valueFormatter: function (params) {
                return datePipe.transform(params.value, APP_CONSTANT.dateTimeFormat)!;
            },
            filter: 'agDateColumnFilter',
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
        { field: "isActive", headerTooltip: 'isActive', flex: 1, tooltipField: 'isActive', headerName : 'Active Bed',
            cellRenderer: (params : any) => {
                return params.data.isActive? '<i class="fa fa-check" style="font-size:20px;color:green;"></i>' : '<i class="fa fa-close" style="font-size:20px;color:red;"></i>' ;
            }
         }
    ] as ColDef[];
}