import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {Box, Grid, Card, CardContent, Typography, Chip} from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import moment from 'moment'
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles({
  card: {
    wirdth: '100%',
    minWidth: 275,
    //maxWidth: 345,

  },
  media: {
    height: 300,
  },
  cardAction:{
    justifyContent: 'center'
  }
});


export default function SimpleCard(props) {
  const {ticketsFilterMobile, edition, deleteTicket, roleUser} = props
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  //const team = ticketsFilterMobile.team;

  return (
    <div>
      <Box>
    {/*<Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
          align="center"
        >
          Tickets{" "}
        </Typography> */}
        <Grid container spacing={3}>
          {ticketsFilterMobile.map(ticket =>
            <Grid item xs={12} sm={6} key={ticket._id}>
              <Card className={classes.card}>
                {/* <CardMedia
                  className={classes.media}
                  image={character.img_url}
                />  */}
                <CardContent>
                  <Box display="flex" justifyContent="flex-end">
                    <Chip color={ticket.status === "Solucionado"? "primary": "secondary"} size="small" label={ticket.status} />
                  </Box>
                  <Typography color="primary" variant="h6">
                    {ticket.institution.name} {" "}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    Descripcion: {ticket.description}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    Encargado: {ticket.team[0]["_user"]["nombre"]}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    Feche de inicio: {moment(ticket.start_date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    Vencimiento: {moment(ticket.end_date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    Prioridad: {ticket.priority}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions className={classes.cardAction}>
                    <Button size="small" href={`/tickets/${ticket._id}`}><VisibilityIcon /></Button>
                    {roleUser === "Admin" &&
                      <div>
                         <Button size="small" onClick={() => edition(ticket)}><EditIcon /></Button>
                        <Button size="small" onClick={() => deleteTicket(ticket._id)}><DeleteIcon /></Button>
                      </div>
                    }            
                </CardActions>

              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
     
    
  );
}