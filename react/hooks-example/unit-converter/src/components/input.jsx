import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

export const InputField = ({ label, value, name, onChange }) => {
  return (
    <Grid item xs={6}>
      <TextField
        variant="outlined"
        style={{ width: '100%' }}
        value={value}
        name={name}
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">{label}</InputAdornment>,
        }}
      />
    </Grid>
  );
};
