import React from 'react'
import { Button, createStyles, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, makeStyles, Radio, RadioGroup, TextField, Typography, withStyles } from '@material-ui/core'
import { withSnackbar, WithSnackbarProps } from 'notistack'
import withHookForm, { WithHookForm } from '../hoc/withHookForm'
import type { FieldValues } from 'react-hook-form'

interface FormFields {
  name: string;
  gender: string
}

interface FormProps extends WithSnackbarProps, WithHookForm<FormFields> {}

class Form extends React.Component<FormProps> {
  handleFormSubmit = (data: FieldValues) => {
    this.props.enqueueSnackbar(JSON.stringify(data))
  }

  handleErrorFormSubmit = (errors: FieldValues) => {
    const errorMessage = Object.keys(errors).map((key) => errors[key]?.message).join(', ')

    this.props.enqueueSnackbar(errorMessage, { variant: 'error' })
  }

  render() {
    const { register, handleSubmit, formState } = this.props.hookForm

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit, this.handleErrorFormSubmit)}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
          <TextField label="Name" fullWidth error={'name' in formState.errors} {...register('name', { required: { message: 'Name is required', value: true }})} helperText={formState.errors.name?.message} />
          </Grid>
          <Grid item xs={12}>
            <FormControl error={'gender' in formState.errors} component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup {...register('gender', { required: { value: true, message: 'Gender is required' } })} row>
                <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                <FormControlLabel value="male" control={<Radio/>} label="Male"/>
              </RadioGroup>
              <FormHelperText>{formState.errors.gender?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item container justifyContent="center" xs={12}>
            <Button color="primary" variant="contained" disableElevation type="submit" fullWidth>Save</Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default withSnackbar(withHookForm<FormProps, FormFields>(Form, {
  mode: 'onChange'
}))