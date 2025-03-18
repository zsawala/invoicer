import PropTypes from 'prop-types';
import React, { Fragment, Component, useState } from 'react'
import * as style from './index.module.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import { session_path } from 'routes'

class InvoicesIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: props.users[0].id
    }
  }

  handleChange = (event) => {
    fetch(session_path(event.target.value), { method: 'PUT' })
    this.setState({ userId: event.target.value })
  }

  columns = () => {
    
  }

  render() {
    const {
      users,
      invoices
    } = this.props

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
      editable: true,
    },
    {
      field: 'paused',
      headerName: 'Paused',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

    const usersList = users.map(user => {
      return <MenuItem value={user.id}>{user.first_name}</MenuItem>
    })

    return (
      <div>
        Current user is {this.state.userId}
        <form>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.userId}
              label="Age"
              onChange={this.handleChange}
            >
              {usersList}
            </Select>
          </FormControl>
        </form>

        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={invoices}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    );
  }
}

InvoicesIndex.propTypes = {
  users: PropTypes.instanceOf(Array).isRequired, // this is passed from the Rails view
};

export default InvoicesIndex;
