import { useState, useEffect } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Typography, Box, Switch } from '@material-ui/core'
import WatchlistService from '../../services/WatchlistService'

const SettingPopup = ({open, setIsSettings, stockUser, candleData}) => {

    const [toggleState, setToggleState] = useState({
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false
    });

    useEffect(() => {
      //console.log(candleData[0]);
      setToggleState({
        checked1: candleData[0].active,
        checked2: candleData[1].active,
        checked3: candleData[2].active,
        checked4: candleData[3].active
      })

    }, [candleData])

    const candleTypes = [
        {id: "1", name: 'Bullish Engulfing Pattern', imgSrc: '/images/bullish_engulfing.PNG'},
        {id: "2", name: 'Bearish Engulfing Pattern', imgSrc: '/images/bearish_engulfing.PNG'},
        {id: "3", name: 'Bullish Morning Star Pattern', imgSrc: '/images/morning_star.PNG'},
        {id: "4", name: 'Bearish Evening Star Pattern', imgSrc: '/images/evening_star.PNG'}
];
    //name to send over to backend
    const candleName = ['Bullish Engulfing', 'Bearish Engulfing', 'Morning Star', 'Evening Star']
    //create obj to send over to backend
    //const candleInfo = {username: '', stockticker: '', active: false, candlename: '', datetime: ''};
    const handleAlertAndClose = async () => {
        //update stock alert from user and start tracking
        
        //Math.floor(Date.now()/1000), stockUser.user, stockUser.ticker,
        const now = Math.floor(Date.now()/1000);
        const candleInfo = candleData.map((x, index) => {return (
          {...x, 
            username: stockUser.user,
            stockticker: stockUser.ticker,
            active: toggleState['checked'+ (index + 1)],
            candlename: candleName[index],
            datetime: (((candleData[index].active !== toggleState['checked' + (index + 1)]) && toggleState['checked' + (index + 1)])
              ? now : ( (candleData[index].active !== toggleState['checked' + (index + 1)]) ? '0' : (candleData[index].datetime !== '0' ? candleData[index].datetime :  '0'))) });});
        //console.log(candleInfo);
        await WatchlistService.setWatchlistCandle(candleInfo);

        setIsSettings();
    }

    const handleSwitchToggle = (event) => {
        //get the switch toggle
        setToggleState({...toggleState, [event.target.name]: event.target.checked})

    }

    return (
        <Dialog open={open} onClose={setIsSettings} aria-labelledby="form-dialog-title" fullWidth maxWidth='sm'>
        <DialogTitle id="form-dialog-title">{'Alert Settings for ' + stockUser.ticker}</DialogTitle>
        <DialogContent>
        <DialogContentText>
            <Typography style={{marginBottom: 32}}>Toggle the switch below to activate alert</Typography>
            {candleTypes.map((x, index) => (
            <Box key={index} align='center' display='flex' flexDirection='row' style={{marginBottom: 20}}>
                <Box flex={1.5}><img src={x.imgSrc} width='40' height='40' flex={2}/></Box>
                <Box flex={5.5} align='left' marginTop={1}><Typography>{x.name}</Typography></Box>
                <Box flex={1.5} align='right'><Switch flex={2} id={x.id} checked={toggleState['checked'+ x.id]} 
                name={'checked' + x.id}
                onChange={handleSwitchToggle}
                inputProps={{ 'aria-label': 'secondary checkbox' }}></Switch></Box>
                <Box flex={4} align='left' marginTop={0.5} marginLeft={1}><Typography flex={4} variant='caption'>{'active from: '}
                <Typography variant='caption' color='primary'>
                  {candleData[index].datetime !== '0' ? candleData[index].datetime : 'NA'} 
                </Typography></Typography></Box>
            </Box>))}
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={setIsSettings} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAlertAndClose} color="primary" variant='contained'>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default SettingPopup
