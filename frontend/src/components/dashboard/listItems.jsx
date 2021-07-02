import React from 'react';
import {ListItem, ListItemIcon, ListItemText, ListSubheader} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import SchoolIcon from '@material-ui/icons/School';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import {NavLink } from 'react-router-dom'

export const mainListItems = (
  <div>
    {/* <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem> */}
    <ListItem button component={NavLink} to="/tickets" activeClassName="Mui-selected">
      <ListItemIcon>
        <ConfirmationNumberIcon />
      </ListItemIcon>
      <ListItemText primary="Tickets" />
    </ListItem>
    <ListItem button component={NavLink} to="/reportes" activeClassName="Mui-selected">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reporte" />
    </ListItem>
    <ListItem button component={NavLink} to="/calendar" activeClassName="Mui-selected" >
      <ListItemIcon>
        <DateRangeIcon />
      </ListItemIcon>
      <ListItemText primary="Calendario" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Administracion</ListSubheader>
    <ListItem button component={NavLink} to="/admin/pendientes" activeClassName="Mui-selected">
      <ListItemIcon>
        <EditAttributesIcon />
      </ListItemIcon>
      <ListItemText primary="Tickets Pendiente" />
    </ListItem>
    <ListItem button  component={NavLink} to="/admin/users" activeClassName="Mui-selected" >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>
    <ListItem button component={NavLink} to="/admin/instituciones" activeClassName="Mui-selected">
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Instituciones" />
    </ListItem>
  </div>
);
