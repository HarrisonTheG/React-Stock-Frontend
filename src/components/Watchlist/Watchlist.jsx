import React from 'react'
import { Typography, Box, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';


//Add DataGrid Material UI component with disableColumnSelector = true <DataGrid disableColumnSelector = 'false' />
const Watchlist = () => {
    return (
        <Grid align="center" width="60%">
            <Box sx={{ height: '80px' }}></Box>
            <Link path='/search/AMC' to='/search/AMC'><Typography>Watchlist page AMC</Typography></Link>
        </Grid>
    )
}

export default Watchlist
