import React from "react";
import { FormikTouched } from "formik";
import { SxProps } from "@mui/material";

export type textFieldProps = {
    name:string;
    // id?:string;
    // fullWidth?:any;
    label?:string;
    type?:string;
    placeholder?:string;
    className?:string;
    touch?:boolean | FormikTouched<any> | FormikTouched<any>[];
    inputProps?:any;
    focused?:boolean;
    minRows?:number;
    autoComplete?:string;
    style?:any;
    error?:any;
    value?:any;
    onBlur?:any;
    sx?:SxProps | undefined
    size?: "medium" | "small" |"big";
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}