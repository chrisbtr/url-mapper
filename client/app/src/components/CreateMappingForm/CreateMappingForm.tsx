import React from 'react'
import Button from '@mui/material/Button';
import Paper, { PaperProps } from '@mui/material/Paper';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export interface CreateMappingFormProps {
  urlTextFieldProps?:  TextFieldProps,
  urlKeyTextFieldProps?: TextFieldProps,
  paperFormProps?: PaperProps<'form'>,
}

const CreateMappingForm: React.FC<CreateMappingFormProps> = ({urlTextFieldProps, urlKeyTextFieldProps, paperFormProps}) => {
  return (
    <Paper 
      component="form" 
      autoComplete='off'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        my: 1
      }}
      {...paperFormProps}
    >
      <div>
        <TextField 
          required
          id="url-key-input"
          size='small'
          placeholder='example'
          label='Key'
          InputLabelProps={{
            shrink: true,
          }}

          {...urlKeyTextFieldProps} 
        />
      </div>
      <div>
        <TextField 
          required
          id="full-url-input"
          size='small'
          placeholder='https://example.com'
          type='url' 
          label='Website URL' 
          InputLabelProps={{
            shrink: true,
          }} 
          {...urlTextFieldProps} 
        />
      </div>
      <Button size='small' type='submit'>Create Mapping</Button>
    </Paper>
  )
}

export default CreateMappingForm