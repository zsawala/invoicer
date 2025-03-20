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

import { base_user_views_path } from 'routes.js.erb'

class InvoicesIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: props.users[0].id,
      view: props.baseView
    }
  }

  handleChange = (event) => {
    fetch(
      base_user_views_path(event.target.value),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'your-api-key',
          'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com',
        }
      },
    ).then((response) => response.json())
      .then((data) => {
        this.setState({ view: data.view, userId: event.target.value })
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      users,
      invoices
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
            <InvoicesTable invoices={invoices} view={this.state.view} userId={this.state.userId}/>
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
