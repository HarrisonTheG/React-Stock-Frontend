import { useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Typography, Box, Switch } from '@material-ui/core'
import { Row } from 'react-bootstrap';

const SettingPopup = ({open, setIsSettings, stockUser}) => {

    const [toggleState, setToggleState] = useState({
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false
    });

    const candleTypes = [
        {id: 1, name: 'Bullish Engulfing Pattern', imgSrc: '/images/bullish_engulfing.PNG'},
        {id: 2, name: 'Bearish Engulfing Pattern', imgSrc: '/images/bearish_engulfing.PNG'},
        {id: 3, name: 'Bullish Morning Star Pattern', imgSrc: '/images/morning_star.PNG'},
        {id: 4, name: 'Bearish Evening Star Pattern', imgSrc: '/images/evening_star.PNG'}
];

    const handleAlertAndClose = () => {
        //update stock alert from user and start tracking

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
            <Typography style={{marginBottom: 32}}>Toggle the switch below to active alert</Typography>
            {candleTypes.map((x) => (
            <Box align='center' display='flex' flexDirection='row' style={{marginBottom: 20}}>
                <Box flex={1.5}><img src={x.imgSrc} width='40' height='40' flex={2}/></Box>
                <Box flex={5.5} align='left' marginTop={1}><Typography>{x.name}</Typography></Box>
                <Box flex={1.5} align='right'><Switch flex={2} id={x.id} checked={toggleState['checked'+ x.id]} 
                name={'checked' + x.id}
                onChange={handleSwitchToggle}
                inputProps={{ 'aria-label': 'secondary checkbox' }}></Switch></Box>
                <Box flex={4} align='left' marginTop={0.5} marginLeft={1}><Typography flex={4} variant='caption'>{'active from: '}
                <Typography variant='caption' color='primary'>{'2/2/2222'} </Typography></Typography></Box>
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
