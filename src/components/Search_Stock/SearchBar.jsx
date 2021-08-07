import { useEffect } from 'react'
import { IconButton, Paper, InputBase, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({ sendFromIcon, sendFromEnter }) => {

    return (
        <Box borderRadius='20px' border={1} borderColor='lightgray'
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '45%', paddingLeft: "24px" }}>
            <InputBase id='searchField' fullWidth autoFocus sx={{ ml: 1, flex: 2 }} placeholder="Search Stocks"
                onKeyDown={sendFromEnter} />
            <IconButton type="submit" aria-label="search" onClick={sendFromIcon} ><SearchIcon /></IconButton>
        </Box >
    );
}

export default SearchBar