import React from 'react'
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const ShowInvoicesButton = (props) => {
  const { setViews } = props

  const handleButton = (event) => {
    setViews([])
  }

  return(
    <Button onClick={handleButton} variant="contained">Invoices</Button>
  )
}

ShowInvoicesButton.propTypes = {
  setViews: PropTypes.instanceOf(Function).isRequired
}

export default ShowInvoicesButton