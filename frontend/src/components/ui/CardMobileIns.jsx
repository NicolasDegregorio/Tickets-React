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
  const {institutionMobile, edition, deleteInstitutions} = props
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Box>
        <Grid container spacing={3}>
          {institutionMobile.map(institution =>
            <Grid item xs={12} sm={12} key={institution._id}>
              <Card className={classes.card}>
                {/* <CardMedia
                  className={classes.media}
                  image={character.img_url}
                />  */}
                <CardContent>
                  <Typography color="primary" variant="h6">
                    {institution.name} {" "}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    Cue: {institution.cue}
                  </Typography>
                  {institution.address ?
                    <div>
                       <Typography color="textSecondary" variant="subtitle2">
                          Direccion: {institution.address.name}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                          Departamento: {institution.address.department}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                          Localidad: {institution.address.department}
                        </Typography>
                    </div>
                    :
                    null
                  }
                </CardContent>
                <Divider />
                <CardActions className={classes.cardAction}>
                  <Button size="small" onClick={() => edition(institution)}><EditIcon /></Button>
                  <Button size="small" onClick={() => deleteInstitutions(institution._id)}><DeleteIcon /></Button>
                </CardActions>

              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
     
    
  );
}