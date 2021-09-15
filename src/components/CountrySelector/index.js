import React from 'react';
import { FormControl, FormHelperText, InputLabel, makeStyles, NativeSelect } from '@material-ui/core';

const useStyles = makeStyles((theme)=>(
    {
        formControl: {
            margin: `${theme.spacing(3)}px 0`,
        }
    }
));

const CountrySelector = ({countries, value, handleOnChange}) => {
    const styles = useStyles();
    return (
        <FormControl className={styles.formControl}>
            <InputLabel htmlFor="" shrink>Quoc gia</InputLabel>
            <NativeSelect 
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: 'country',
                    in: 'country-selector'
                }}
            >
                {countries.map((country)=>{
                    return <option key={country.ISO2} value={country.ISO2.toLowerCase()}>{country.Country}</option>
                })}
            </NativeSelect>
            <FormHelperText>Lua chon quoc gia</FormHelperText>
        </FormControl>
    )
}

export default CountrySelector
