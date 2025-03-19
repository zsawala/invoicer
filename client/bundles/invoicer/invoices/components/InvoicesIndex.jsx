import PropTypes from 'prop-types';
import React, { Fragment, Component, useState } from 'react'
import * as style from './index.module.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  PageContainer
} from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import InvoicesTable from './InvoicesTable'

class InvoicesIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: props.users[0].id
    }
  }

  handleChange = (event) => {
    // fetch(session_path(event.target.value), { method: 'PUT' })
    this.setState({ userId: event.target.value })
  }

  render() {
    const {
      users,
      invoices,
      baseView
    } = this.props

    const usersList = users.map(user => {
      return <MenuItem value={user.id}>{user.first_name}</MenuItem>
    })
    
    return (
      <PageContainer>
        <Grid container spacing={1} >
          <Grid size={12}>Current user is {this.state.userId} </Grid>
          <Grid size={12}>
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
          </Grid>

          <Grid size={12}>
            <InvoicesTable invoices={invoices} view={baseView} userId={this.state.userId}/>
          </Grid>
        </Grid>
      </PageContainer>
    );
  }
}

InvoicesIndex.propTypes = {
  users: PropTypes.instanceOf(Array).isRequired,
  invoices: PropTypes.instanceOf(Array).isRequired,
  baseView: PropTypes.instanceOf(Map)
};

export default InvoicesIndex;
