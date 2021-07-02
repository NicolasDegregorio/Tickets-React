import React from 'react'
import {Dialog, CircularProgress,  DialogTitle, DialogContent, IconButton, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(4),
        position: 'absolute',
        top: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            position: 'absolute',
            top: theme.spacing(0),
          },
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, closeForm, loading } = props;
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog fullScreen={fullScreen} open={openPopup} maxWidth="sm" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    {loading && <CircularProgress />}
                    <IconButton aria-label="delete" onClick={() =>  closeForm()}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers align="center">
                {children}
            </DialogContent>
            
        </Dialog>
    )
}