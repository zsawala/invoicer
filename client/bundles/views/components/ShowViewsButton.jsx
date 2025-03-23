import PropTypes from 'prop-types';
import React from 'react'
import Button from '@mui/material/Button';
import { Actions } from '../../views/actions'

const ShowViewsButton = (props) => {
  const { setViews, userId } = props

  const handleButton = (event) => {
    Actions.getViews(userId, setViews)
  }

  return(
    <Button onClick={handleButton} variant="contained">Views</Button>
  )
}

ShowViewsButton.propTypes = {
  userId: PropTypes.instanceOf(Number).isRequired
}

export default ShowViewsButton