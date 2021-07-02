import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Tabs, Tab, Typography, Box} from '@material-ui/core';
import Chat from './Chat';
import Notification from './Notification';
import Detalles from './Tabs/Detalles';
import Equipo from './Tabs/Equipo';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  const {ticket, setTicket,  responsible, setResponsible, usuarioId, comments, users, institution, institutionAddress} = props
  const classes = useStyles();
  const [notification, setNotification] = React.useState({open: false, message: '', severity: ''});
  const [value, setValue] = React.useState(0);
  const [team, setTeam] = React.useState([])
  const [userTeam, setUserTeam] = React.useState([])

  React.useEffect(() => {
    const getUsersTeam = () => {
      const usersRepeat = []
      responsible.map(user => usersRepeat.push(user._user._id) )
      const arrayFiltrado = users.filter((user) => !usersRepeat.includes(user._id))
      setUserTeam(arrayFiltrado)
    }
    getUsersTeam()
  },[responsible])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.root}>
      <Notification 
                message = {notification.message}
                open = {notification.open}
                severity= {notification.severity}
                setNotification={setNotification}
      />
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Detalles" {...a11yProps(0)} />
          <Tab label="Equipo" {...a11yProps(1)} />
          <Tab label="Mensajes" {...a11yProps(2)} />
          {/* <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          <Detalles
            institutionAddress={institutionAddress}
            institution={institution}
            responsible={responsible}
            usuarioId={usuarioId}
            ticket={ticket}
            setTicket={setTicket}
            notification={notification}
            setNotification={setNotification}

          />

      </TabPanel>
      <TabPanel value={value} index={1}>
        <Equipo
          userTeam={userTeam}
          team={team}
          setTeam={setTeam}
          responsible={responsible}
          setResponsible={setResponsible}
          usuarioId={usuarioId}
          ticket={ticket}
          setTicket={setTicket}
          notification={notification}
          setNotification={setNotification}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Chat
          ticket = {ticket}
          userId = {usuarioId}
          comments = {comments}
        >
              
        </Chat>
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */} 
    </div>
  );
}