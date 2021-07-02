import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Button, Box, TextField } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form'
import Maps from '../../../GoogleMaps/Maps'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '25ch',
    },
  }));

const FormAddEdit = (props) => {
    const {institution, addInstitution,editInstitution, edit, emptyFields, setDataAddress} = props;
    const classes = useStyles();
    const {errors, handleSubmit, control} = useForm();
    return (
        <div>
            <form onSubmit={edit ? handleSubmit(editInstitution) : handleSubmit(addInstitution)} className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            rules={{
                                    required: {
                                        value: true, 
                                        message: 'Campo requerido'
                                        }, 
                                    minLength: {
                                        value: 6, 
                                        message: 'Mínimo 6 carácteres'
                                    }
                                    
                            }}
                            control={control}
                            name="institutionName" 
                            id="institutionName"
                            label="Nombre"
                            variant="outlined" 
                            defaultValue={institution.name || ''}
                            
                            as={
                            <TextField
                                error={ errors.institutionName ? true : false }
                                helperText={errors.institutionName ? errors.institutionName.message : null} 
                                
                            />
                            }
                        />
                       {/*  <Controller
                            rules={{
                                    
                            }}
                            control={control}
                            name="institutionAddres" 
                            id="institutionAddres"
                            label="Direccion"
                            variant="outlined" 
                            defaultValue={institution.addres || ''}
                            type="text"
                            as={
                            <TextField
                                error={ errors.institutionAddres ? true : false }
                                helperText={errors.institutionAddres ? errors.institutionAddres.message : null} 
                                
                            />
                            }
                        /> */}
                        
                    </Grid>
                    <Grid Item xs={12} sm={6}>
                        <Controller
                            rules={{
                                    
                            }}
                            control={control}
                            name="institutionCue" 
                            id="institutionCue"
                            label="CUE"
                            variant="outlined" 
                            defaultValue={institution.cue || ''}
                            type="number"
                            as={
                                <TextField
                                    error={ errors.institutionCue ? true : false }
                                    helperText={errors.institutionCue ? errors.institutionCue.message : null} 
                                    
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={11} style={{position: 'relative', height: '40vh'}}>
                       <Box mt={2} ml={2}>
                            <Maps 
                                setDataAddress={setDataAddress}
                                institution={institution}
                                edit={edit}
                            /> 
                        </Box> 
                    </Grid>               
                </Grid>
                <Grid item sm={12}>
                    <Box display="flex" justifyContent="flex-end" m={1} p={1} mt={8}>
                        <Button color="primary" type="button" onClick={() =>  emptyFields()}>
                            Cancelar
                        </Button>
                        <Button color="primary" type="submit">
                            Guardar
                        </Button>
                    </Box>
                </Grid>
            </form>
        </div>
    )
}

export default FormAddEdit

