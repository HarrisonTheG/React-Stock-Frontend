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
import SessionDataService from '../../services/SessionDataService'
import WatchlistService from '../../services/WatchlistService'

  
  var headers = ['No.', 'Stock Ticker', 'Company Name' , 'Actions']
  // const rows = [
  //   { id: 1, ticker: 'AAPL', companyName: 'Apple Inc.'},
  //   { id: 2, ticker: 'PLTR', companyName: 'Palantir Tech' },
  //   { id: 3, ticker: 'TSLA', companyName: 'Tesla'},
  //   { id: 4, ticker: 'SOFI', companyName: 'Sofi Tech'},
  //   { id: 5, ticker: 'BYND', companyName: 'Beyond Meat'},
  //   { id: 6, ticker: 'SFT', companyName: 'Shift Tech'},
  // ];

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

    const [watchlist, setWatchlist] = useState(null)

    var user = SessionService.getSessionStorageOrDefault('username', null);
    //var firstTimeLogin = true;

    // useEffect(() => {
    //   //console.log(SessionService.getSessionStorageOrDefault('username', null));
    //   if(firstTimeLogin){
    //     user = SessionService.getSessionStorageOrDefault('username', null); 
    //     headers = ['No.', 'Stock Ticker', 'Company Name' , 'Actions'];
    //     setWatchlist(SessionDataService.getUserWatchlist());
    //     firstTimeLogin = false;
    //   }
    //   console.log('this is executed')
    // }, [firstTimeLogin])


    useEffect(() => {//executed everytime navigated through tab bar
      
      setWatchlist(() => {
        setIsLogin(SessionService.getSessionStorageOrDefault('username', null) !== null);
        return SessionDataService.getUserWatchlist();
      })

    }, [user])

    //stock ticker and user info to send over to settings and delete pop up
    const stockUser = useRef({
        ticker: null,
        user: null
    })

    const candleData = useRef(null)

    const deleteIconClicked = (stockTicker) => {
        stockUser.current.ticker = stockTicker;
        stockUser.current.user = user;
        setIsDeleteBox(!isDeleteBox);
    }

    const loadStockSettings = async (ticker, user) => {
        const req = await WatchlistService.getWatchlistCandle(ticker, user);
        const candleReqData = req.data;
        candleData.current = candleReqData
        console.log(candleData.current)

    }

    const settingIconClicked = async (stockTicker) => {
        stockUser.current.ticker = stockTicker;
        stockUser.current.user = user;

        await loadStockSettings(stockTicker, user);
        setIsSettings(!isSettings);
    }

    return (
        <Grid align='center' style={{ height: 400, width: '55%', marginLeft: 'auto', marginRight: 'auto'}} >

          {isLogin ? <div> 
            <Box sx={{ height: '80px' }}></Box>
            <Typography variant='h5' align='left'> Stock Watchlist </Typography>
            <Box sx={{ height: '24px' }}></Box>

            {watchlist !== null ?  <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead bgcolor='lightgrey' >
          <TableRow>
            {headers.map( (x, index) => <TableCell key={index} align="left"><Box fontWeight={700} fontSize={16} m={1}>{x}</Box></TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {watchlist.map((row, index) => (
            <TableRow hover={true} key={index} onClick={() => console.log('row ' + row.stockticker + ' is Clicked!')}>
              <TableCell component="th" scope="row" align='left'>
                &nbsp; {index + 1}
              </TableCell>
              <TableCell align="left">{row.stockticker}</TableCell>
              <TableCell align="left">{row.stockname.toUpperCase()}</TableCell>
              <TableCell align="left" id={row.stockticker}>
                <IconButton path={'/search/'+ row.stockticker } to={ '/search/' + row.stockticker } component={Link} size='small'>
                  <EqualizerIcon /></IconButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <IconButton size='small' onClick={() => settingIconClicked(row.stockticker)} ><SettingsIcon /></IconButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <IconButton size='small' onClick={() => deleteIconClicked(row.stockticker)}><DeleteOutlineIcon /></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
        : 
        <Box marginLeft='auto' marginRight='auto'>
        <Typography variant='h5'> There are no stocks in watchlist yet!</Typography></Box>
      }
   
          </div> : 
          <Box style={{marginTop: 120}}>
          <Typography variant='h5'>Please Login to unlock this feature</Typography></Box>
          }
            

    {isDeleteBox && <DeletePopup open={isDeleteBox} setIsDeleteBox= {() => setIsDeleteBox(!isDeleteBox)} stockUser={stockUser.current} setWatchlist={setWatchlist}/>}
    {isSettings && <SettingPopup open={isSettings} setIsSettings= {() => setIsSettings(!isSettings)} stockUser={stockUser.current} candleData={candleData.current}/>}
        </Grid>
    )
}

export default Watchlist
