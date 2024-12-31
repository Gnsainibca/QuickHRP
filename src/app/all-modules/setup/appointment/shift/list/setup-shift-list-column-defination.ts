import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';

export function getColumnDefinations(): ColDef[] {
    return [
        {
            field: "action",
            width: 100,
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
        { field: "name", headerTooltip: 'Name', filter: true, flex: 1, tooltipField: 'name' },
        { field: "timeFrom", filter: true, flex: 1, tooltipField: 'tax' },
        { field: "timeTo", filter: true, flex: 1, tooltipField: 'tax' },
    ] as ColDef[];
}