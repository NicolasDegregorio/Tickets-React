import React from 'react'
import axios from 'axios'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField} from '@material-ui/core'
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

const DialogEquipo = (props) => {
    const {notification, setNotification, ticket, open, setOpen, userTeam, team, setTeam, setResponsible} = props;
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const addMembersTeam = async () => {
        const membersTeam = {
            ticketId: ticket._id,
            members: team
        }
        try {
            const res = await axios.post('api/ticket/team/addMembersTeam', membersTeam)
            handleClose()
            setResponsible(res.data.team)
            setNotification({ ...notification, open: true, message: "Miembro/s Agregados Correctamente", severity: "success" })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event, value)  =>{
        setTeam(value);
    }
    return (
        <div>
            <Dialog fullScreen={fullScreen} disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Agregar Integrantes</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={userTeam}
                                getOptionLabel={(option) => option.nombre}
                                onChange={handleInputChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Integrantes"
                                        placeholder="Usuarios"
                                    />
                                )}
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={addMembersTeam} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogEquipo
