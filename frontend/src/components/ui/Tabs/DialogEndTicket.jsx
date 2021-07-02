import React from 'react'
import axios from 'axios'
import {Dialog, DialogActions, DialogContent, DialogTitle, 
    FormControl, TextField, Button} 
from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      width: "100%",
    },
  }));


const DialogEndTicket = (props) => {
    const {notification, setNotification, ticket, setTicket, open, setOpen} = props;
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { errors, handleSubmit, control } = useForm();

    const ticketSolve = async (data) => {
        const solution = {
            ticketId: ticket._id,
            solution: data.ticketSolution

        }
        try {
            await axios.post('api/ticket/solution/change', solution)
            handleClose()
            setNotification({ ...notification, open: true, message: "Situacion del Ticket Informada", severity: "success" })
            setTicket({ ...ticket, solution: solution.solution })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    };
    return (
        <div>
            <Dialog fullScreen={fullScreen} disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Finalizar Ticket</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(ticketSolve)} className={classes.root} className={classes.container}>
                        <FormControl className={classes.formControl}>
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
                                name="ticketSolution"
                                id="ticketSolution"
                                label="Que se Hizo"
                                variant="outlined"
                                defaultValue={''}

                                as={
                                    <TextField
                                        error={errors.ticketSolution ? true : false}
                                        helperText={errors.ticketSolution ? errors.ticketSolution.message : null}

                                    />
                                }
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit(ticketSolve)} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogEndTicket 
