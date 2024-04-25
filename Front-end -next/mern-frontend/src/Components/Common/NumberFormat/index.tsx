import React from 'react';
import TextField from '@mui/material/TextField';

function NumberTextField(props:any) {
  const handleChange = (event:any) => {
    const { value } = event.target;
    
    // Check if the value is a valid number (you can customize this validation according to your requirements)
    if (!isNaN(value)) {
      props.onChange(value);
    }
  };

  return (
    <TextField
      {...props}
      type="number"
      onChange={handleChange}
    />
  );
}

export default NumberTextField;