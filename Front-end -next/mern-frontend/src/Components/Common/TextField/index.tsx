import React, { useEffect, useState } from "react";
import { Typography, TextField } from "@material-ui/core";
import {textFieldProps} from '../../../Types/textField';
import styles from './index.module.css';

export default function TextFields(props: textFieldProps) {

  return (
    <div style={{width:"100%"}} className={"reusable_textFiled"}>  
      <TextField
        name={props.name}
        type={props.type}
        label={props.label}
        id="outlined-basic"
        className={props?.className}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        variant="outlined"
        inputProps={{
          style: {
            height: 3
          },
        }}
        // sx={props?.sx ?? {}}
        focused={props.focused}
        error={props.error?.length > 0}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        // minRows={props.minRows}
      />
      {props.error?.length > 0  && (
        // <Typography className={`errorMessage ${styles['error']}`}>{props.error}</Typography>
        <p className={`errorMessage ${styles['error']}`}>{props.error}</p>
      )}
    </div>
  );
}
