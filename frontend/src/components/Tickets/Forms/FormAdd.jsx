import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Button, Box, FormControl, FormHelperText, InputLabel, MenuItem , Select , TextField } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form'
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const FormAdd = (props) => {
    const {ticket, addTicket,editTicket, edit, institutions, users, emptyFields } = props;
    const classes = useStyles();
    const {register, errors, handleSubmit, control} = useForm();


    return (
        <div>
            <form onSubmit={edit ? handleSubmit(editTicket) : handleSubmit(addTicket)} className={classes.root}>
                <Grid container >
                    <Grid item xs={12} sm={6}>
                        {edit ?
                            <FormControl variant="outlined">
                                <Controller
                                    as={({ onChange }) => (
                                        <Autocomplete
                                            className="form-item"
                                            options={institutions}
                                            onChange={(_, data) => onChange(data)}
                                            getOptionLabel={option => option.name}
                                            defaultValue={{ name: ticket.institution || null }}
                                            getOptionSelected={(option, values) => option.name === values.name}
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label="Institucion"
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    variant="outlined"
                                                    error={errors.ticketInstitution ? true : false}
                                                />
                                            )}
                                        />
                                    )}
                                    name="ticketInstitution"
                                    control={control}
                                /* rules={{
                                    required: {
                                        value: true, 
                                        message: 'Campo requerido'
                                    }
                                }} */
                                />
                                <FormHelperText error={errors.ticketInstitution ? true : false}>{errors.ticketInstitution ? errors.ticketInstitution.message : null} </FormHelperText>
                            </FormControl>
                            :
                            <FormControl variant="outlined">
                                <Controller
                                    as={({ onChange }) => (
                                        <Autocomplete
                                            className="form-item"
                                            options={institutions}
                                            onChange={(_, data) => onChange(data)}
                                            getOptionLabel={option => option.name}
                                            defaultValue={{ name: ticket.institution || null }}
                                            getOptionSelected={(option, values) => option.name === values.name}
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label="Institucion"
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    variant="outlined"
                                                    error={errors.ticketInstitution ? true : false}
                                                />
                                            )}
                                        />
                                    )}
                                    name="ticketInstitution"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Campo requerido'
                                        }
                                    }}
                                />

                                <FormHelperText error={errors.ticketInstitution ? true : false}>{errors.ticketInstitution ? errors.ticketInstitution.message : null} </FormHelperText>
                            </FormControl>
                        }
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
                            name="ticketDescription"
                            id="ticketDescription"
                            label="Descripcion"
                            control={control}
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            defaultValue={ticket.description || ''}


                            as={
                                <TextField
                                    error={ errors.ticketDescription ? true : false }
                                    helperText={errors.ticketDescription ? errors.ticketDescription.message : null}
                                />
                            }
                        />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Encargado</InputLabel>
                            <Controller
                                name="ticketLeader"
                                control={control}
                                rules={{required: {
                                        value: true, 
                                        message: 'Campo requerido'
                                        }
                                    }}
                                defaultValue={ticket.team._user || ''}
                                
                                as={
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="ticketLeader"
                                    value={ticket.team._user}
                                    error={ errors.ticketLeader ? true : false }
                                    label="Encargado"
                                    >
                                    {
                                        users.map((user,index) => (
                                            <MenuItem key={index} value={user._id}>{user.nombre}</MenuItem>
                                        ))
                                    }
                                </Select>
                                } 
                            />
                             <FormHelperText error={ errors.ticketLeader ? true : false }>{errors.ticketLeader ? errors.ticketLeader.message : null} </FormHelperText>
                        </FormControl>
                
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            inputRef={register({
                                required: {
                                    value: true, 
                                    message: 'Campo requerido'
                                    }
                               })}
                            name="start_date" 
                            id="start_date"
                            label="Fecha de Inicio"
                            type="date"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            defaultValue = {ticket.start_date.slice(0,10)}
                            error={ errors.start_date ? true : false }
                            helperText={errors.start_date ? errors.start_date.message : null}
                        />
                        <Box mt={2}>
                            <TextField
                                inputRef={register({
                                    required: {
                                        value: true, 
                                        message: 'Campo requerido'
                                        }
                                })}
                                name="end_date"
                                id="end_date"
                                label="Fecha Limite"
                                type="date"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                defaultValue= {ticket.end_date.slice(0,10)}
                                error={ errors.start_date ? true : false }
                                helperText={errors.end_date ? errors.end_date.message : null}
                            />
                        </Box>
                        <Box>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="labelPrioridad">Prioridad</InputLabel>
                                <Controller
                                name="ticketPriority"
                                control={control}
                                rules={{required: {
                                        value: true, 
                                        message: 'Campo requerido'
                                        }
                                    }}
                                    defaultValue={ticket.priority || ''}
                                as={
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        label="Prioridad"
                                        id="ticketPriority"                                       
                                        value={ticket.priority}
                                        error={ errors.ticketPriority ? true : false }   
                                        >
                                        <MenuItem value={'Alta'}>Alta</MenuItem>
                                        <MenuItem value={'Media'}>Media</MenuItem>
                                        <MenuItem value={'Baja'}>Baja</MenuItem>
                                    </Select>
                                }
                                />
                                 <FormHelperText
                                    error={ errors.ticketPriority ? true : false }
                                >
                                    {errors.ticketPriority ? errors.ticketPriority.message : null} 
                                </FormHelperText>
                            </FormControl>
                        </Box>
                        
                    </Grid>              
                </Grid>
                <Grid item sm={12}>
                    <Box display="flex" justifyContent="flex-end" m={1} p={1}>
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

export default FormAdd

