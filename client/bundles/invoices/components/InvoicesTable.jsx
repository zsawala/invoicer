import PropTypes from 'prop-types';
import React, { useEffect } from 'react'
import { DataGrid, useGridApiRef, getGridStringOperators } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputNumberInterval from './InputNumberInterval'
import { Actions } from '../../views/actions'

const containsOnlyOperators = getGridStringOperators().filter((op => ['contains'].includes(op.value)));

const amountOnlyOperators = [
  {
    label: 'between',
    value: 'between',
    getApplyFilterFn: (filterItem) => {
      if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
        return null;
      }
      if (filterItem.value[0] == null || filterItem.value[1] == null) {
        return null;
      }
      return (value) => {
        return (
          value !== null &&
          filterItem.value[0] <= value &&
          value <= filterItem.value[1]
        );
      };
    },
    InputComponent: InputNumberInterval,
  },
];

const columns = [
  {
    field: 'reference',
    headerName: 'Reference',
    width: 300,
    editable: false,
    filterOperators: containsOnlyOperators
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 150,
    editable: false,
    filterOperators: amountOnlyOperators
  },
  {
    field: 'paused',
    headerName: 'Paused',
    type: 'boolean',
    width: 110,
    editable: false,
  }
];

const InvoicesTable = (props) => {
  const apiRef = useGridApiRef();

  const { invoices, view, userId } = props

  useEffect(() => {
    apiRef.current.setFilterModel({ items: view.filters })
  })

  const handleCreateButton = (event) => {
    const currentState = apiRef.current.exportState()
    const visibility = currentState.columns.columnVisibilityModel
    const filters = currentState.filter.filterModel.items

    Actions.createView(userId, true, visibility, filters)
  }

  const handleUpdateButton = (event) => {
    const currentState = apiRef.current.exportState()
    const visibility = currentState.columns.columnVisibilityModel
    const filters = currentState.filter.filterModel.items

    if (view.id) {
      Actions.updateView(userId, view.id, true, visibility, filters)
    }
  }

  let updateButton = null;
  if(view.id) {
    updateButton = <Button onClick={handleUpdateButton} variant="contained">Update view</Button>
  }

  return(
    <Grid>
      <Box sx={{ height: 100, width: '100%' }}>
        Currently displayed view id is {view.id}
        <Stack spacing={2} direction="row">
          <Button onClick={handleCreateButton} variant="contained">Create new view</Button>
          {updateButton}
        </Stack>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={invoices}
          columns={columns}
          apiRef={apiRef}
          disableRowSelectionOnClick
          disableColumnSorting
        />
      </Box>
    </Grid>
  )
}

InvoicesTable.propTypes = {
  invoices: PropTypes.instanceOf(Array).isRequired
}

export default InvoicesTable