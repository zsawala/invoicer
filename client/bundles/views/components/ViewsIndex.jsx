import PropTypes from 'prop-types';
import React, { Component } from 'react'
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

class ViewsIndex extends Component {
  constructor(props) {
    super(props)
  }

  handleEditButton = (view, event) => {
    const { setViewAndViews } = this.props

    setViewAndViews(view, [])
  }

  render() {
    const {
      views
    } = this.props

    const viewsList = views.map(view => {
      return <TableRow>
        <TableCell>{view.id.toString()}</TableCell>
        <TableCell align="left">{JSON.stringify(view.visibility)}</TableCell>
        <TableCell align="left">{JSON.stringify(view.filters)}</TableCell>
        <TableCell align="left">
            <Button onClick={this.handleEditButton.bind(this, view)} variant="contained">View</Button>
          </TableCell>
      </TableRow>
    })
 
    return (
      <Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Visibility</TableCell>
                <TableCell align="left">Filters</TableCell>
                <TableCell align="left">Action</TableCell>
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

ViewsIndex.propTypes = {
  views: PropTypes.instanceOf(Array).isRequired,
  userId: PropTypes.instanceOf(Number).isRequired
};

export default ViewsIndex;
