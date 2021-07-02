import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {Button, Icon} from '@material-ui/core';
import Notification from './Notification';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {useSelector} from 'react-redux'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: 'auto'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const Chat = (props) => {
  const {ticket, userId, comments} = props
  const classes = useStyles();
  const usuarioId = useSelector(store => store.usuario.usuario.data._id)
  const [notification, setNotification] = React.useState({open: false, message: '', severity: ''});
  const [commentsTicket,setCommentsTicket] = React.useState(comments)
  const url =  process.env.REACT_APP_URL;

  React.useEffect(() => {
    console.log(commentsTicket)
  },[commentsTicket])

  const [comment,setComent] = React.useState({
    ticketId : ticket._id,
    userId: userId,
    comment : ''
  })
  const handleKeypress = e => {
    if (e.key === 'Enter') {
      addComment();
    }
  };

  const addComment = async () => {
    try {
      const res = await axios.post('api/ticket/comment', comment)
      setCommentsTicket(res.data.comments)
      setComent({...comment, comment: ''})
      setNotification({...notification, open: true,  message: "Mensaje Enviado Correctamente", severity: "success"})
    } catch (error) {
      console.log(error)
    }
  }
  const deleteComment = async (commentId) =>{
    const ticketId = ticket._id
    try {
      await axios.delete(`api/ticket/comment/deleteComment?ticketId=${ticketId}&commentId=${commentId}`) 
      const arrayFiltrado = commentsTicket.filter(comment => comment._id !== commentId)
      setCommentsTicket(arrayFiltrado)
      setNotification({...notification, open: true,  message: "Mensaje Eliminado Correctamente", severity: "error"})
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div>
        <Grid container  className={classes.chatSection}>
          <Notification 
                message = {notification.message}
                open = {notification.open}
                severity= {notification.severity}
                setNotification={setNotification}
            />
            <Grid item xs={12} className={classes.borderRight500}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic-email"
                      label="Mensaje"
                      variant="outlined"
                      value= {comment.comment}
                      onKeyPress= {handleKeypress}
                      onChange={e => setComent({...comment, comment: e.target.value})} 
                      fullWidth />
                </Grid>
                <Box ml={1} mt={2}>
                    <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<Icon>send</Icon>}
                            onClick={() => addComment()}
                        >
                            Enviar
                    </Button>
                </Box>
                {
                    commentsTicket.map( (comment) =>(
                      <Box mt={2}>
                       <Divider />
                        <List>
                            <ListItem button key={comment._user.nombre}>
                                <ListItemIcon>
                                  <Avatar alt="Remy Sharp" src={`${url}/img/avatar.jpg`} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={comment._user.nombre}
                                    secondary={comment.comment}  
                                >       
                                </ListItemText>
                                {usuarioId === comment._user._id ?
                                  <ListItemSecondaryAction>
                                    <IconButton edge="start" aria-label="delete" onClick={() => deleteComment(comment._id)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                  :''  
                                }
                            </ListItem>
                        </List>
                        <Divider />
                      </Box>  
                    ))                    
                  }
          </Grid>  
        </Grid>
      </div>
  );
}

export default Chat;