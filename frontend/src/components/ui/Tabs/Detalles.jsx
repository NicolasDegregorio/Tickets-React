import React from 'react'
import moment from 'moment'
import {Button, Chip,Typography, Box, Grid} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import MapInstitution from '../../GoogleMaps/MapInstitution';
import DialogEndTicket from './DialogEndTicket'
const Detalles = (props) => {
    const {institution, institutionAddress, usuarioId, notification, setNotification, responsible, ticket, setTicket} = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    };


    return (
        <div>
            <Grid container>
                <Box>
                    <DialogEndTicket
                        open={open}
                        setOpen={setOpen} 
                        notification={notification}
                        setNotification={setNotification}
                        ticket={ticket}
                        setTicket={setTicket}
                        usuarioId={usuarioId}
                    />        
                </Box>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        {responsible.map(item => (item.role === 'Leader' && item._user._id === usuarioId && ticket.solution === '') ?
                            <Button onClick={handleClickOpen}>Cambiar Estado Ticket</Button>
                            : '')}
                        {(ticket.solution !== '' && ticket.status === 'Sin Solucionar') &&
                            <Chip label="Ticket Pendiente de Autorizacion" variant="outlined" color="primary" />
                        }
                        {ticket.status === 'Solucionado' &&
                            <Chip label="Ticket Resuelto" variant="outlined" icon={<CheckIcon />} color="default" style={{ backgroundColor: '#8bc34a' }} />
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Institucion
                    </Typography>
                        <Typography variant="body2" gutterBottom>
                            {institution.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Descripcion
                    </Typography>
                        <Typography variant="body2" gutterBottom>
                            {ticket.description}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Direccion:
                    </Typography>
                        <Typography variant="body2" gutterBottom>
                            {institutionAddress.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Fechas
                    </Typography>
                        <Typography variant="body2" gutterBottom>
                            Fecha Inicio: {moment(ticket.start_date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Fecha Vencimiento: {moment(ticket.end_date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} style={{ position: 'relative', height: '40vh' }}>
                    <MapInstitution
                        lat={institutionAddress.lat}
                        lng={institutionAddress.lng}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Detalles
