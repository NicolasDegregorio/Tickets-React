import React from 'react';
import {
  Avatar,
  Card,
  CardActionArea, 
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';


const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  avatar: props =>({
    backgroundColor: props.color,
    height: 56,
    width: 56
  })
}));


export default function SimpleCard(props) {
  const classes = useStyles(props);
  const {typeTickets, totalsTickets, action, typeFilter} = props;
  return (
    <React.Fragment>
         <Card
            className={classes.root} onClick={() => action(typeFilter)}
            >
              <CardActionArea>
                <CardContent>
                    <Grid
                    container
                    justify="space-between"
                    >
                        <Grid item>
                            <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="subtitle2"
                            >
                                {typeTickets}
                            </Typography>
                            <Typography
                            color="textPrimary"
                            variant="h3"
                            >
                                {totalsTickets}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar className={classes.avatar} >
                            <ConfirmationNumberIcon />
                            </Avatar>
                        </Grid>
                    </Grid>
                </CardContent>
              </CardActionArea>  
            </Card>
    </React.Fragment>
  );
}