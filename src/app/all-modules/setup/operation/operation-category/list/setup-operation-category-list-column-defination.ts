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
        { field: "name", headerName : 'Operation Category', headerTooltip: 'Operation Category', filter: true, flex: 1, tooltipField: 'name' , autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    ] as ColDef[];
}