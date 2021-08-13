import {useState} from 'react'
import { MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
     
      minWidth: 120,
    },
    selectEmpty: {
    
    },
  }));

const FormSelect = ({sendSelectedStock}) => {

    const classes = useStyles();
    const [stock, setStock] = useState('');
  
    const handleChange = (event) => {
      setStock(event.target.value);
      sendSelectedStock(event.target.value);
    };

    return (
    <FormControl className={classes.formControl} variant='filled'>
        <InputLabel id="demo-simple-select-helper-label">Choose Stock</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={stock}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'AAPL'}>AAPL</MenuItem>
          <MenuItem value={'PLTR'}>PLTR</MenuItem>
          <MenuItem value={'BYND'}>BYND</MenuItem>
        </Select>
        <FormHelperText>scan candles for past 200 days</FormHelperText>
      </FormControl>
    )
}

export default FormSelect
