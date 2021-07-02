import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {Box, Grid, Card, CardContent, Typography, Chip} from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles({
  card: {
    width: '100%',
    minWidth: 275,

  },
  media: {
    height: 300,
  },
  cardAction:{
    justifyContent: 'center'
  }
});


export default function SimpleCard(props) {
  const {usersMobile, edition, deleteUser} = props
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Box>
        <Grid container spacing={3}>
          {usersMobile.map(user =>
            <Grid item xs={12} sm={12} key={user._id}>
              <Card className={classes.card}>
                {/* <CardMedia
                  className={classes.media}
                  image={character.img_url}
                />  */}
                <CardContent>
                  <Typography color="primary" variant="h6">
                    {user.nombre} {" "}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    Apellido: {user.lastName}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    email: {user.email}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    Rol: {user.role}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions className={classes.cardAction}>
                  <Button size="small" onClick={() => edition(user)}><EditIcon /></Button>
                  <Button size="small" onClick={() => deleteUser(user._id)}><DeleteIcon /></Button>
                </CardActions>

              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
     
    
  );
}