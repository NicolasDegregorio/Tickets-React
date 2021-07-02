import React from 'react'
import axios from 'axios'
import Dashboard from '../dashboard/Dashboard'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Notification from '../ui/Notification';


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  
const Pendientess = () => {
    const classes = useStyles();
    const [notification, setNotification] = React.useState({open: false, message: '', severity: ''});
    const [tickets, setTickets] = React.useState([])
    const url =  process.env.REACT_APP_URL;

    React.useEffect( () => {
        const getTickets = async () =>{  
           try {
                const res = await axios.get('api/ticket/solution/pending')
                const data = res.data
                setTickets(data.data)
           } catch (error) {
               console.log("ocurrio un error")
               console.log(error)
           }
        }
        getTickets()
    },[])

    const ticketAprobed = async (id) => {
        const ticketId = {
            ticketId : id
        }
        try {
            await axios.post('api/ticket/solution/aprobed',ticketId)
            setNotification({...notification, open: true,  message: "Ticket Marcado como Solucionado", severity: "success"})
            const arrayTickets = tickets.filter(ticket => ticket._id !== id)
            setTickets(arrayTickets)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Notification 
                message = {notification.message}
                open = {notification.open}
                severity= {notification.severity}
                setNotification={setNotification}
            />
            <Grid container spacing={1}>
                {
                    tickets.map(ticket => 
                        <Grid item md={4} xs={12} sm={6}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image={`${url}/img/ticket.jpg`}
                                    title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {ticket.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {ticket.solution}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" href={`/tickets/${ticket._id}`}>
                                        Ver Ticket
                                    </Button>
                                    <Button size="small" color="primary" onClick={() => ticketAprobed(ticket._id)}>
                                        Solucionado
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>  
                    
                    )
                }
            </Grid>
        </div>
    )
}

const Pendientes = () => {
    return (
        <div>
            <Dashboard section={"Tickets Pendientes de Aprobacion"}>
                <Pendientess>

                </Pendientess>
            </Dashboard>
        </div>
    )
}

export default Pendientes
