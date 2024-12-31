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
        { field: "name", headerName : 'Supplier Name', headerTooltip: 'Supplier Name', filter: true, flex: 1, tooltipField: 'name', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "phone", headerName : 'Supplier Phone', headerTooltip: 'Supplier Phone', filter: true, flex: 1, tooltipField: 'phone', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "contactPersonName", filter: true, flex: 1, tooltipField: 'contactPersonName', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "contactPersonPhone", filter: true, flex: 1, tooltipField: 'contactPersonPhone', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "drugLicenseNo", headerName : 'Drug License Number', headerTooltip: 'Drug License Number', filter: true, flex: 1, tooltipField: 'drugLicenseNo', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
        { field: "address", headerName : 'address', headerTooltip: 'address', filter: true, flex: 1, tooltipField: 'address', autoHeight: true, wrapText: true, cellStyle: { 'line-height': '20px', 'padding-bottom': '10px', 'padding-top': '10px' } },
    ] as ColDef[];
}