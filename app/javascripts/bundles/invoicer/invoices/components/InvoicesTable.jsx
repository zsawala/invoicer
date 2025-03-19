// import PropTypes from 'prop-types';
// import React from 'react'
// import { DataGrid, useGridApiRef, getGridStringOperators } from '@mui/x-data-grid';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid2';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import InputNumberInterval from './InputNumberInterval'

// import { user_views_path, user_view_path } from 'routes'

// const InvoicesTable = (props) => {
//   const apiRef = useGridApiRef();

//   const { invoices, view, userId } = props

//   const containsOnlyOperators = getGridStringOperators().filter((op => ['contains'].includes(op.value)));

//   const amountOnlyOperators = [
//     {
//       label: 'between',
//       value: 'between',
//       getApplyFilterFn: (filterItem) => {
//         if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
//           return null;
//         }
//         if (filterItem.value[0] == null || filterItem.value[1] == null) {
//           return null;
//         }
//         return (value) => {
//           return (
//             value !== null &&
//             filterItem.value[0] <= value &&
//             value <= filterItem.value[1]
//           );
//         };
//       },
//       InputComponent: InputNumberInterval,
//     },
//   ];

//   const columns = [
//     {
//       field: 'reference',
//       headerName: 'Reference',
//       width: 300,
//       editable: false,
//       filterOperators: containsOnlyOperators
//     },
//     {
//       field: 'amount',
//       headerName: 'Amount',
//       width: 150,
//       editable: false,
//       filterOperators: amountOnlyOperators
//     },
//     {
//       field: 'paused',
//       headerName: 'Paused',
//       type: 'boolean',
//       width: 110,
//       editable: false,
//     }
//   ];

//   const handleSaveButton = (event) => {
//     const currentState = apiRef.current.exportState()

//     if (view) {
//       fetch(
//         user_views_path(userId),
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-RapidAPI-Key': 'your-api-key',
//             'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com',
//           },
//           body: JSON.stringify({
//             view: {
//               base: true,
//               visibility: currentState.columns.columnvisibilityModel,
//               filters: currentState.filter.filterModel.items
//             }
//           })
//         },
//       )
//     } else {
//       fetch(
//         user_view_path(userId, view.id),
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-RapidAPI-Key': 'your-api-key',
//             'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com',
//           },
//           body: JSON.stringify({
//             view: {
//               base: true,
//               visibility: currentState.columns.columnvisibilityModel,
//               filters: currentState.filter.filterModel.items
//             }
//           })
//         },
//       )
//     }
//     console.log(currentState)
//   }

//   const handleLoadButton = (event) => {
//     apiRef.current.restoreState({
//       density: "standard",
//       columns: {
//         orderedFields: ['paused', 'reference', 'amount']
//       }
//     });
//   }

//   return(
//     <Grid>
//       <Stack spacing={2} direction="row">
//         <Button onClick={handleSaveButton} variant="contained">Save default setting</Button>
//         <Button onClick={handleLoadButton} variant="contained">Load default setting</Button>
//       </Stack>
//       <Box sx={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={invoices}
//           columns={columns}
//           apiRef={apiRef}
//           disableRowSelectionOnClick
//           disableColumnSorting
//         />
//       </Box>
//     </Grid>
//   )
// }

// InvoicesTable.propTypes = {
//   invoices: PropTypes.instanceOf(Array).isRequired
// }

// export default InvoicesTable