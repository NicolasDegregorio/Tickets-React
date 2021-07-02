import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Button, Box, FormControl, FormHelperText, InputLabel, MenuItem , Select , TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form'

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
    const {user, addUser,editUser, edit, emptyFields} = props;
    const classes = useStyles();
    const {errors, handleSubmit, control, watch} = useForm();
    
    const password = watch("userPassword");
    const handleChangeCheckBox = (event) => {
        setCheckBox(event.target.checked);
      };
    const [checkBox, setCheckBox] = useState(() => {
        const initialState = !edit;
        return initialState;
    });
    return (
        <div>
            <form onSubmit={edit ? handleSubmit(editUser) : handleSubmit(addUser)} className={classes.root}>
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
                            name="userName" 
                            id="userName"
                            label="Nombre"
                            variant="outlined" 
                            defaultValue={user.name || ''}
                            
                            as={
                            <TextField
                                error={ errors.userName ? true : false }
                                helperText={errors.userName ? errors.userName.message : null} 
                                
                            />
                        }
                        />
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
                            name="userLastName" 
                            id="userLastName"
                            label="Apellido"
                            variant="outlined" 
                            defaultValue={user.lastName || ''}
                            
                            as={
                            <TextField
                                error={ errors.userLastName ? true : false }
                                helperText={errors.userLastName ? errors.userLastName.message : null} 
                                
                            />
                        }
                        />
                        <Box>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="labelPrioridad">Rol</InputLabel>
                                <Controller
                                name="userRole"
                                control={control}
                                rules={{required: {
                                        value: true, 
                                        message: 'Campo requerido'
                                        }
                                    }}
                                    defaultValue={user.role || ''}
                                as={
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        label="Prioridad"
                                        id="ticketPriority"                                       
                                        value={user.role}
                                        error={ errors.userRole ? true : false }   
                                        >
                                        <MenuItem value={'User'}>Usuario</MenuItem>
                                        <MenuItem value={'Admin'}>Admin</MenuItem>
                                    </Select>
                                }
                                />
                                 <FormHelperText
                                    error={ errors.userRole ? true : false }
                                >
                                    {errors.userRole ? errors.userRole.message : null} 
                                </FormHelperText>
                            </FormControl>
                        </Box>
                        
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Controller
                            rules={{
                                    required: {
                                        value: true, 
                                        message: 'Campo requerido'
                                        }, 
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Email con Formato Invalido",
                                          },
                                    
                            }}
                            control={control}
                            name="userEmail" 
                            type="email"
                            id="userEmail"
                            label="Email"
                            variant="outlined" 
                            defaultValue={user.email || ''}
                            
                            as={
                                <TextField
                                    error={ errors.userEmail ? true : false }
                                    helperText={errors.userEmail ? errors.userEmail.message : null} 
                                    
                                />
                                }
                        />
                        <Controller
                            rules={{
                                    required:  {
                                        value: checkBox? true: false, 
                                        message: 'Campo requerido'
                                        },
                                    minLength: {
                                        value: 6,
                                        message: "La Contraseña Tiene que Tener al Menos 6 Caracteres"
                                    } 
                            }}
                            control={control}
                            name="userPassword" 
                            type="password"
                            id="userPassword"
                            label="Contraseña"
                            variant="outlined" 
                            defaultValue={''}
                            disabled={!checkBox}
                            as={
                                <TextField
                                    error={ errors.userPassword ? true : false }
                                    helperText={errors.userPassword ? errors.userPassword.message : null} 
                                    
                                />
                                }
                        />
                        <Controller
                            rules={{
                                    required: {
                                        value: checkBox? true: false, 
                                        message: 'Campo requerido'
                                        }, 
                                        validate: value => (value === password || !checkBox) || "Las contraseñas no Coinciden"
                                    
                            }}
                            control={control}
                            name="userPasswordRepeat" 
                            type="password"
                            id="userPasswordRepeat"
                            label="Repetir Contraseña"
                            variant="outlined" 
                            defaultValue={''}
                            disabled={!checkBox}
                            
                            as={
                                    <TextField
                                        error={ errors.userPasswordRepeat ? true : false }
                                        helperText={errors.userPasswordRepeat ? errors.userPasswordRepeat.message : null} 
                                        
                                    />
                                }
                        />               
                    </Grid>
                    <Grid xs={12} sm={12}>
                        {edit &&
                            <FormControlLabel
                                control={<Checkbox checked={checkBox} onChange={handleChangeCheckBox} color="primary" />}
                                label="Desea Cambiar la Contraseña"
                            />
                        }
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

export default FormAddEdit

