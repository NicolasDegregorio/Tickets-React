import React,{useState} from 'react';
import { useSelector, useDispatch} from 'react-redux'
import {logout} from '../redux/usuarioDucks';
import {secondaryListItems } from './dashboard/listItems';
import Popup from './ui/Popup'
import {List} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import BarChartIcon from '@material-ui/icons/BarChart';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 500,
    marginTop: '4px',
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#F2F3F4",
    "& .MuiBottomNavigationAction-root": {
      "@media (max-width: 768px)": {
        minWidth: "auto",
        padding: "6px 0"
      }
    }
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const role = useSelector(store => store.usuario.role);
  const [openPopup, setOpenPopup] = useState(false);
  const pathname = window.location.pathname;
  const [value, setValue] = React.useState(pathname);

  const closeForm = () => {
    setOpenPopup(false)
  }
  return (
    <div>

    <BottomNavigation
      className={classes.stickToBottom}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    
    >
      <BottomNavigationAction label="Tickets" value="/tickets" icon={<ConfirmationNumberIcon />} component={NavLink} to="/tickets" />
      <BottomNavigationAction label="Reportes" value="/reportes" icon={<BarChartIcon />} component={NavLink} to="/reportes" />
      <BottomNavigationAction label="Calendario" value="/calendar" icon={<DateRangeIcon />} component={NavLink} to="/calendar" />
      {role === 'Admin' && 
        <BottomNavigationAction label="Admin"  icon={<SupervisorAccountIcon />} onClick={() => setOpenPopup(true)} />
      }
      <BottomNavigationAction label="Cerrar Sesion" icon={<PermIdentityIcon />} onClick={() => dispatch(logout())} />
    </BottomNavigation>
      <Popup
          title= {"Menu Administrador"}
          openPopup={openPopup}
          closeForm={closeForm}

      >
         <List>{secondaryListItems}</List>
      </Popup>
    </div>
    
  );
}