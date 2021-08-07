import { Typography, Box, Grid } from '@material-ui/core'
import { useState } from 'react'
import StockChart from './StockChart'
import Comment from './Comment'
import SearchBar from './SearchBar'

const SearchStock = () => {

    const [searchTerm, setTerm] = useState('');

    const sendTermFromIcon = () => {
        var value = ''
        value = document.getElementById('searchField').value;
        if (value != '')
            setTerm(value);
    }

    const sendTermFromEnter = (e) => {
        var value = ''
        const searchField = document.getElementById('searchField');
        value = searchField.value;
        if (e != null && e.key === 'Enter' && value != '') { //comes from enter
            setTerm(value);
            searchField.blur();
        }
    }

    return (
        <Grid align="center" width='60%'>
            <Box sx={{ height: '80px' }}></Box>
            <SearchBar sendFromIcon={sendTermFromIcon} sendFromEnter={sendTermFromEnter}></SearchBar>
            <Typography>{'Stock Info of ' + searchTerm}</Typography>
            <StockChart stock={searchTerm} />
            <Comment stock={searchTerm} />
        </Grid>
    );
}

export default SearchStock
