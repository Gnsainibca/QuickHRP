import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridActionButtonComponent } from 'src/app/shared/components/grid-action-button/grid-action-button.component';

export function getColumnDefinations(): ColDef[] {
    return [
        {
            field: "action",
            width: 100,
            cellRenderer: GridActionButtonComponent,
            cellRendererParams: (params: ICellRendererParams) => {
                params.data.id
            }
        },
        { field: "name", headerTooltip: 'Name', filter: true, flex: 1, tooltipField: 'name' , wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "bedType", headerTooltip: 'Bed Type', filter: true, flex: 1, tooltipField: 'chargeCategory' , wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "bedGroup", headerTooltip: 'Bed Group', filter: true, flex: 1, tooltipField: 'bedGroup' , wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "isAvailable", headerTooltip: 'Available', filter: true, flex: 1, tooltipField: 'isAvailable' },
    ] as ColDef[];
}