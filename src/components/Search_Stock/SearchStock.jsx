import { Typography, Box, Grid, InputBase } from '@material-ui/core'
import { useState } from 'react'
import StockChart from './StockChart'
import Comment from './Comment'
import SearchBar from './SearchBar'

const SearchStock = () => {
    const [searchTerm, setTerm] = useState('');
    const sendTermToParent = (term) => {
        setTerm(term);
    }

    return (
        <Grid align="center" width='60%'>
            <Box sx={{ height: '80px' }}></Box>
            <SearchBar sendTermToParent={sendTermToParent}></SearchBar>
            <Typography>Stock Info</Typography>
            <StockChart />
            <Comment />
        </Grid>
    );
}

export default SearchStock
