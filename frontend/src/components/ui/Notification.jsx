import React, {Fragment} from 'react'
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Notification = (props) => {
    const { message, open, severity,setNotification } = props;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setNotification({open: false})
      };
    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    return (
        <Fragment>
            <Snackbar 
                open={open} 
                autoHideDuration={5000} 
                onClose={handleClose}  
                anchorOrigin={{vertical: 'bottom',
                horizontal: 'right'}}
            >
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>

        </Fragment>
    )
}

export default Notification
