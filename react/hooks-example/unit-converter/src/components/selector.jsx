import React from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const Selector = ({ list = [], value, mdWidth, label, name, onChange }) => {
  return (
    <Grid item xs={mdWidth}>
      <FormControl variant="outlined" style={{ width: '100%' }}>
        <InputLabel>{label}</InputLabel>
        <Select value={value} name={name || label} onChange={onChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {list.map((e) => {
            const [val, display] = label === 'Measurement' ? [e, e] : [e.abbr, e.plural];

            return (
              <MenuItem key={val} value={val}>
                <em>{display}</em>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};
