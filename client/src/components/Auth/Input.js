import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import React from "react";
import Visability from "@material-ui/icons/Visibility";
import VisabilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({
  half,
  name,
  handleChange,
  label,
  type,
  handleShowPassword,
  value,
  onBlur,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        value={value}
        label={label}
        type={type}
        onBlur={onBlur}
        InputProps={
          name === "password" || name === "confirmPassword"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visability /> : <VisabilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      ></TextField>
    </Grid>
  );
};

export default Input;
