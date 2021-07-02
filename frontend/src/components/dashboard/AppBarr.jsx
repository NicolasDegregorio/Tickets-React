import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UserMenu from './userMenu';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    
  }));
const AppBarr = (props) => {
  const { handleDrawerOpen, open, mobile } = props;
    const classes = useStyles();
    return (
        <div>
            <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                {!mobile &&
                  <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                 >
                    <MenuIcon />
                 </IconButton>
                }
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    {props.section}
                </Typography>
                {!mobile &&
                  <IconButton color="inherit">
                    <UserMenu />
                  </IconButton>
                }
                {/*   <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default AppBarr
