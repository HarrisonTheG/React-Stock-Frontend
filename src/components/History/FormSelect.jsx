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

const FormSelect = ({sendSelectedStock, watchStock}) => {

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
          {watchStock.map((x,index) => (<MenuItem key={index} value={x.stockticker}>{x.stockticker}</MenuItem>))}
        </Select>
        <FormHelperText>scan candles for past 200 days</FormHelperText>
      </FormControl>
    )
}

export default FormSelect
