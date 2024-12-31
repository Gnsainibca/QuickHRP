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
        { field: "name", headerName : 'Parameter Name', headerTooltip: 'Parameter Name', filter: true, flex: 1, tooltipField: 'name', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "referenceRange", headerTooltip: 'referenceRange', filter: true, flex: .7, tooltipField: 'referenceRange' , autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "pathologyUnit", headerName : 'Unit', headerTooltip: 'Unit', filter: true, flex: .7, tooltipField: 'pathologyUnit' , autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "description", headerName : 'description', headerTooltip: 'description', filter: true, flex: 2, tooltipField: 'description' , autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    ] as ColDef[];
}