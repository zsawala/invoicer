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
import { Actions } from '../../views/actions'

class ViewsIndex extends Component {
  constructor(props) {
    super(props)
  }

  handleEditButton = (view, event) => {
    setViews([])
    setView(view)
  }

  render() {
    const {
      views,

    } = this.props

    const viewsList = views.map(view => {
      return(
        <TableRow>
          <TableCell>{view.visibility}</TableCell>
          <TableCell align="right">{view.filters}</TableCell>
          <TableCell align="right">
            <Button onClick={handleEditButton.bind(this, view)} variant="contained">Edit</Button>
          </TableCell>
        </TableRow>
      )
    })
    
    return (
      <Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Visibility</TableCell>
                <TableCell align="right">Filters</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {viewsList}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  }
}

InvoicesIndex.propTypes = {
  views: PropTypes.instanceOf(Array).isRequired,
  userId: PropTypes.instanceOf(Number).isRequired
};

export default InvoicesIndex;
