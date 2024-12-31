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
        { field: "chargeCategory", headerTooltip: 'Charge Category', filter: true, flex: 1, tooltipField: 'chargeCategory' , wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "chargeType", headerTooltip: 'Charge Type', filter: true, flex: 1, tooltipField: 'chargeType' , wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "unitType", headerTooltip: 'Unit Type', filter: true, flex: .7, tooltipField: 'unitType' , wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "tax", headerTooltip: 'Tax', filter: true, flex: .5, tooltipField: 'tax' },
        { field: "standardCharge", headerTooltip: 'Standard Charge', filter: true, flex: .7, tooltipField: 'standardCharge' },
    ] as ColDef[];
}