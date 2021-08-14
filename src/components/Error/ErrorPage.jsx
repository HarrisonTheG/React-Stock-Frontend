import React from 'react'
import { Box, Typography } from '@material-ui/core'

const ErrorPage = () => {
    return (
        <Box style={{marginTop: 56}}>
            <Typography variant='h5' style={{marginBottom: 12}}>Sorry! There is a problem loading this page</Typography>
            <Typography variant='subtitle1'>We are unable to load the required resources for you. Please try again later! </Typography>
        </Box>
    )
}

export default ErrorPage
