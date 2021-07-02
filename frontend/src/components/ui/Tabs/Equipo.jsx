import React, {Fragment} from 'react'
import axios from 'axios'
import {Button, Typography, Box, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton  } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogEquipo from './DialogEquipo';

const Equipo = (props) => {
    const {team, setTeam, setResponsible, usuarioId, notification, setNotification, responsible, ticket, userTeam} = props;
    const [open, setOpen] = React.useState(false);

    const deleteMembersTeam = async (userId) => {
        const ticketId = ticket._id
        try {
            const res = await axios.delete(`api/ticket/team/deleteMembersTeam?ticketId=${ticketId}&userId=${userId}`)
            setResponsible(res.data.team)
            setNotification({ ...notification, open: true, message: "Miembro Eliminado Correctamente", severity: "error" })
        } catch (error) {
            console.log(error)
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    
    
    return (
        <div>
            <Grid container>
                <DialogEquipo
                    open={open}
                    setOpen={setOpen} 
                    notification={notification}
                    setNotification={setNotification}
                    ticket={ticket}
                    setResponsible={setResponsible}
                    team={team}
                    setTeam={setTeam}
                    userTeam={userTeam}
                />
                <Grid xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        {responsible.map(item => (item.role === 'Leader' && item._user._id === usuarioId && ticket.solution === '') ?
                            <Button onClick={handleClickOpen}>Agregar al Equipo</Button>
                            : '')}
                        
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={-2}>
                <Grid md={6}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Encargado:
                    </Typography>
                        <List dense>
                            {responsible.map(item =>
                                item.role === 'Leader' ?
                                    <Fragment>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <PersonIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item._user.nombre}
                                                secondary={null}
                                            />
                                        </ListItem>
                                    </Fragment>
                                    : ''
                            )}
                        </List>
                    </Box>
                </Grid>
                <Grid md={6}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Equipo de Soporte:
                    </Typography>
                        <List dense>
                            {responsible.map(item =>
                                item.role === 'Support' ?
                                    <Fragment>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <PersonIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item._user.nombre}
                                                secondary={null}
                                            />
                                            {ticket.team[0]._user._id === usuarioId &&
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="start" aria-label="delete" onClick={() => deleteMembersTeam(item._user._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            }
                                        </ListItem>
                                    </Fragment>
                                    : ''
                            )}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Equipo
