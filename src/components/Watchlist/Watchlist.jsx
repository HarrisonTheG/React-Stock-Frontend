import { useState, useRef, useEffect }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { Link } from 'react-router-dom';

import DeletePopup from './DeletePopup';
import SettingPopup from './SettingPopup';
import SessionService from '../../session/SessionService';
  
  const headers = ['No.', 'Stock Ticker', 'Company Name', 'Price (USD)' , 'Actions']
  const rows = [
    { id: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 35.03 },
    { id: 2, ticker: 'PLTR', companyName: 'Palantir Tech', price: 42.12 },
    { id: 3, ticker: 'TSLA', companyName: 'Tesla', price: 45.56 },
    { id: 4, ticker: 'SOFI', companyName: 'Sofi Tech', price: 16.65 },
    { id: 5, ticker: 'BYND', companyName: 'Beyond Meat', price: 0.78 },
    { id: 6, ticker: 'SFT', companyName: 'Shift Tech', price: 150.34 },
  ];

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Watchlist = () => {
    const classes = useStyles();
    
    const [isLogin, setIsLogin] = useState(false)
    const [isDeleteBox, setIsDeleteBox] = useState(false)
    const [isSettings, setIsSettings] = useState(false)

    var user = SessionService.getSessionStorageOrDefault('username', null);

    useEffect(() => {
      //console.log(SessionService.getSessionStorageOrDefault('username', null));
      user = SessionService.getSessionStorageOrDefault('username', null); 
    })

    useEffect(() => {
      setIsLogin(SessionService.getSessionStorageOrDefault('username', null) !== null);
    }, [user])

    //stock ticker and user info to send over to settings and delete pop up
    const stockUser = useRef({
        ticker: null,
        user: null
    })

    const deleteIconClicked = (stockTicker) => {
        stockUser.current.ticker = stockTicker;
        setIsDeleteBox(!isDeleteBox);
    }

    const settingIconClicked = (stockTicker) => {
        stockUser.current.ticker = stockTicker;
        setIsSettings(!isSettings);
    }

    return (
        <Grid align='center' style={{ height: 400, width: '55%', marginLeft: 'auto', marginRight: 'auto'}} >

          {isLogin ? <div> 
            <Box sx={{ height: '80px' }}></Box>
            <Link path='/search/AMC' to='/search/AMC'><Typography>Watchlist page AMC</Typography></Link>
            <Typography variant='h5' align='left'> Stock Watchlist </Typography>
            <Box sx={{ height: '24px' }}></Box>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead bgcolor='lightgrey' >
          <TableRow>
            {headers.map( (x) => <TableCell align="left"><Box fontWeight={700} fontSize={16} m={1}>{x}</Box></TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow hover={true} key={row.id} onClick={() => console.log('row ' + row.id + ' is Clicked!')}>
              <TableCell component="th" scope="row" align='left'>
                &nbsp;{index + 1}
              </TableCell>
              <TableCell align="left">{row.ticker}</TableCell>
              <TableCell align="left">{row.companyName}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left" id={row.ticker}>
                <IconButton path={'/search/'+ row.ticker } to={ '/search/' + row.ticker } component={Link} size='small'>
                  <EqualizerIcon /></IconButton>&nbsp;&nbsp;&nbsp;
                <IconButton size='small' onClick={() => settingIconClicked(row.ticker)}><SettingsIcon /></IconButton>&nbsp;&nbsp;&nbsp;
                <IconButton size='small' onClick={() => deleteIconClicked(row.ticker)}><DeleteOutlineIcon /></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div> : 
          <Box style={{marginTop: 120}}>
          <Typography variant='h5'>Please Login to unlock this feature</Typography></Box>
          }
            

    {isDeleteBox && <DeletePopup open={isDeleteBox} setIsDeleteBox= {() => setIsDeleteBox(!isDeleteBox)} stockUser={stockUser.current}/>}
    {isSettings && <SettingPopup open={isSettings} setIsSettings= {() => setIsSettings(!isSettings)} stockUser={stockUser.current}/>}
        </Grid>
    )
}

export default Watchlist
