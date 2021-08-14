
import { IconButton, Typography, Box, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link, NavLink } from 'react-router-dom';
import ChartService from '../../services/ChartService'
import { useState }  from 'react'

const SearchBar = ({ sendFromIcon }) => {

    const [top5Stock, setTop5] = useState(
        [{ticker: "AAPL", companyName: "APPLE INC"},
        {ticker: "MSFT", companyName: "MICROSOFT CORP"},
        {ticker: "GOOG", companyName: "ALPHABET INC-CL C"},
        {ticker: "AMZN", companyName: "AMAZON.COM INC"},
        {ticker: "FB", companyName: "FACEBOOK INC-CLASS A"}]
    );

    const handleFieldChange = async (event) => {

        try{
            if(event.target.value !== null || event.target.value !== ''){
        const req = await ChartService.getTop5Stock(event.target.value);
        const top5 = req.data;
        
        //console.log(top5[4].symbol);
        
        setTop5(top5Stock.map( (stock, index) => {
                return ({...stock, ticker: top5[index].symbol, companyName: top5[index].description});
        }))

    }
        } catch (error){
            console.log(error)
        }
        
    }

    return (
        <Box borderRadius='20px' border={1} borderColor='lightgray'
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '55%', paddingLeft: "24px" }}>

            <Autocomplete freeSolo style={{ ml: 1, flex: 2 }}
            options={top5Stock} 
            renderInput={(params) => (
                <TextField
                id='searchField' fullWidth autoFocus label="Search Stock"
                {...params} onChange={handleFieldChange}
                />
                
            )}
            getOptionLabel={(option) => `${option.ticker} - ${option.companyName}`}
            renderOption={(option) =>  {return <Box component={NavLink}
            path={'/search/' + option.ticker } to={'/search/' + option.ticker } 
            fullWidth style={{textDecoration: 'none', width: '100%'}}><Typography >
                {option.ticker + ' - ' + option.companyName}</Typography></Box>}}
            />
            
            <IconButton type="submit" aria-label="search" onClick={sendFromIcon} ><SearchIcon /></IconButton>
        </Box >
    );
    
}

export default SearchBar