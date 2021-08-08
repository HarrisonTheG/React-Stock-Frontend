import { useEffect, useState } from 'react'
import { Typography, Box, Divider } from '@material-ui/core'


const StockChart = ({ stock }) => {
    return (
        <Box width='45%' marginTop='24px'>
            {'Stock Chart of ' + stock}
            <Box height='12px' />
            <Divider />
        </Box>
    )
}

export default StockChart
