import React from 'react'
import Button from '@mui/material/Button';

const ShowInvoicesButton = (props) => {
  const { setViews } = props

  const handleButton = (event) => {
    setViews([])
  }

  return(
    <Button onClick={handleButton} variant="contained">Views</Button>
  )
}

export default ShowInvoicesButton