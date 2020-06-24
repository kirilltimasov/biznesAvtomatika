import React from "react";
import TextField from "@material-ui/core/TextField";

const TextFieldAdapter = ({ input, meta, ...rest }) => (
    <TextField
        {...input}
        {...rest}
        // onChange={(event, value) => input.onChange(value)}
        helperText={meta.touched ? meta.error : ''}
        error={meta.touched && meta.error ? true : false}
    />
)


export default TextFieldAdapter;