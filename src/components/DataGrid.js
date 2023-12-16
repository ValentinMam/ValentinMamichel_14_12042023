import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const EmployeeDataGrid = ({ columns, rows }) => {
  return (
    <DataGrid
      title="Current Employees"
      columns={columns}
      rows={rows}
      pagination
      components={{ Toolbar: GridToolbar }}
    />
  )
}

export { EmployeeDataGrid }
