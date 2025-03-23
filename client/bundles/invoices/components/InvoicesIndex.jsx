import PropTypes from 'prop-types';
import React, { Component } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  PageContainer
} from '@toolpad/core/PageContainer';
import InvoicesTable from './InvoicesTable'
import ShowViewsButton from '../../views/components/ShowViewsButton';
import ShowInvoicesButton from './ShowInvoicesButton';
import ViewsIndex from '../../views/components/ViewsIndex';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { Actions } from '../../views/actions'

class InvoicesIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      views: [],
      userId: props.users[0].id,
      view: props.view
    }

    this.setViews = this.setViews.bind(this)
    this.setViewAndViews = this.setViewAndViews.bind(this)
  }

  updateUserIdState = (view) => {
    this.setState({ view: view, userId: this.state.userId })
  }

  handleChange = (event) => {
    this.setState({ view: this.state.view, userId: event.target.value })
    Actions.getView(
      event.target.value,
      this.updateUserIdState.bind(this)
    )
  }

  setViews(views) {
    this.setState({ view: this.state.view, userId: this.state.userId, views: views })
  }

  setViewAndViews(view, views) {
    this.setState({ view: view, userId: this.state.userId, views: views })
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
      screen = <InvoicesTable invoices={invoices} view={this.state.view} userId={this.state.userId}/>
      button = <ShowViewsButton userId={this.state.userId} setViews={this.setViews}/>
    } else {
      screen = <ViewsIndex views={this.state.views} userId={this.state.userId} setViewAndViews={this.setViewAndViews}/>
      button = <ShowInvoicesButton setViews={this.setViews}/>
    }

    const options = {
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: '30px',
      transition: transitions.SCALE
    }

    return (
      <AlertProvider {...options}>
        <PageContainer>
          <Box sx={{ height: 150, width: '100%' }}>
            <Stack spacing={2} direction="row">Current user is {this.state.userId}</Stack>
            <Stack spacing={2} direction="row">
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
            </Stack>
            <Stack spacing={2} direction="row">{button}</Stack>
          </Box>

          <Box sx={{ height: 400, width: '100%' }}>
            {screen}
          </Box>
        </PageContainer>
      </AlertProvider>
    );
  }
}

InvoicesIndex.propTypes = {
  users: PropTypes.instanceOf(Array).isRequired,
  invoices: PropTypes.instanceOf(Array).isRequired,
  view: PropTypes.instanceOf(Map)
};

export default InvoicesIndex;
