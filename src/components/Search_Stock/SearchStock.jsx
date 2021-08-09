import { Box, Grid } from '@material-ui/core'
import { useState } from 'react'
import StockChart from './StockChart'
import Comment from './Comment'
import SearchBar from './SearchBar'
import StockHeader from './StockHeader'

const SearchStock = () => {

    const [searchTerm, setTerm] = useState('');

    //search Bar callbacks
    const sendTermFromIcon = () => {
        var value = ''
        value = document.getElementById('searchField').value;
        if (value !== '')
            setTerm(value);
    }

    const sendTermFromEnter = (e) => {
        var value = ''
        const searchField = document.getElementById('searchField');
        value = searchField.value;
        if (e !== null && e.key === 'Enter' && value !== '') { //comes from enter
            setTerm(value);
            searchField.blur();
        }
    }

    return (
        <Grid align='center' justify='center' width='55%'>
            <Box sx={{ height: '80px' }}></Box>
            <SearchBar sendFromIcon={sendTermFromIcon} sendFromEnter={sendTermFromEnter}></SearchBar>
            <StockHeader stock={searchTerm} />
            <StockChart stock={searchTerm} />
            <Comment stock={searchTerm} />
        </Grid>
    );
}

export default SearchStock
