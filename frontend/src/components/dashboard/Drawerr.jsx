import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Divider, Drawer,IconButton, List} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import {useSelector} from 'react-redux'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    drawer: {
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerPaper: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(1) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(3) + 1,
      },
    },
  }));

const Drawerr = (props) => {
    const { handleDrawerClose, open } = props;
    const classes = useStyles();
    const role = useSelector(store => store.usuario.role)
    return (
        <div>
            <Drawer
                variant="persistent"
                className={clsx(classes.drawer, {
                  [classes.drawerPaper]: open,
                  [classes.drawerPaperClose]: !open,
                })}
                classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                {role === 'Admin' && 
                  <List>{secondaryListItems}</List>
                }
            </Drawer>
        </div>
    )
}

export default Drawerr
