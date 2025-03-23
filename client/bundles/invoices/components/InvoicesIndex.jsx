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
import ShowViewsButton from '../../views/components/ShowViewsButton';
import ShowInvoicesButton from './ShowInvoicesButton';
import ViewsIndex from '../../views/components/ViewsIndex';
import { Actions } from '../../views/actions'

class InvoicesIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      views: [],
      userId: props.users[0].id,
      view: props.baseView
    }

    this.setViews = this.setViews.bind(this)
    this.setView = this.setView.bind(this)
  }

  updateUserIdState = (view) => {
    this.setState({ view: view, userId: this.state.userId })
  }

  handleChange = (event) => {
    this.setState({ view: this.state.view, userId: event.target.value })
    Actions.getBaseView(
      event.target.value,
      this.updateUserIdState.bind(this)
    )
  }

  setViews(views) {
    this.setState({ view: this.state.view, userId: this.state.userId, views: views })
  }

  setView(view) {
    this.setState({ view: view, userId: this.state.userId, views: this.state.views })
  }

  render() {
    const {
      users,
      invoices
    } = this.props

    const usersList = users.map(user => {
      return <MenuItem value={user.id}>{user.first_name}</MenuItem>
    })

    let button = null;
    if (this.state.views.length == 0) {
      debugger
      screen = <InvoicesTable invoices={invoices} view={this.state.view} userId={this.state.userId}/>
      button = <ShowViewsButton userId={this.state.userId} setViews={this.setViews}/>
    } else {
      debugger
      screen = <ViewsIndex views={this.state.views} userId={this.state.userId} setViews={this.setViews} setView={this.setView}/>
      button = <ShowInvoicesButton setViews={this.setViews}/>
    }

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
            {button}
            {screen}
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
