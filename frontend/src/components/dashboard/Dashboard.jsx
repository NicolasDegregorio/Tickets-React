import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline, Container, Grid, Typography, Link } from '@material-ui/core';
import AppBarr from './AppBarr';
import Drawerr from './Drawerr';
import Botton from '../Botton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Sigef - Gestion de Incidencias
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    //flexDirection: column,
    minHeight: '100vh',
  },
  
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      height: '91vh',
    },
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  footer: {
    //marginTop: '1rem',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    //padding: '1rem',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function Dashboard(props) {
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const  width = window.matchMedia("(max-width: 700px)").matches ? false : true;
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(width);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBarr
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        mobile={mobile}
        section={props.section}
      />
      {!mobile &&
        <Drawerr
        handleDrawerClose={handleDrawerClose}
        open={open}
        />
      }
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {children}
              {/* <Router>
                  <Route component={Tickets} path="/tickets" exact/> 
                  <Route component={Prueba} path="/tickets/:id" exact/> 
                  <Route component={Calendar} path="/calendar" exact/>
                  <Route component={Infome} path="/informe" exact/> 
              </Router> */}
            </Grid>
          </Grid>
        </Container>
        <footer className={classes.footer}>
          {mobile ? 
             <Botton />
             :
             <Copyright /> 
          }
        </footer>

      </main>
    </div>
  );
}