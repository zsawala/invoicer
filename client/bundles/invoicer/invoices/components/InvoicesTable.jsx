import PropTypes from 'prop-types';
import React from 'react'
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const InvoicesTable = (props) => {
  const columns = [
    {
      field: 'reference',
      headerName: 'Reference',
      width: 150,
      editable: true,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      editable: false,
    },
    {
      field: 'paused',
      headerName: 'Paused',
      type: 'boolean',
      width: 110,
      editable: false,
    }
  ];
  const apiRef = useGridApiRef();
  debugger
  const { invoices } = props

  return(
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={invoices}
        columns={columns}
        apiRef={apiRef}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}

InvoicesTable.propTypes = {
  invoices: PropTypes.instanceOf(Array).isRequired
}

export default InvoicesTable