import React from 'react';
import Login from './components/Login'
import Dashboard from './components/dashboard/Dashboard'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {useSelector} from 'react-redux'
import Tickets from './components/Tickets/Tickets'
import Detalles from './components/Tickets/Detalles';
import Calendar from './components/Tickets/Calendar';
import Pendientes from './components/Administracion/Pendientes';
import Users from './components/Administracion/Users/Users';
import Institution from './components/Administracion/Institutions/Institutions';
import Informe from './components/Tickets/Infome';
import axios from 'axios';


function App() {
  const RutaProtegida = ({component, path, ...rest}) => {
    const tokenState = useSelector(store => store.usuario.token)
      if(tokenState){
        return <Route component={component} path={path} {...rest} />
     }else{
      return <Redirect to="/" {...rest} />
    }
  }

    // Rutas Administrador
    const RutaAdmin = ({component, path, ...rest}) => {  
      const role = useSelector(store => store.usuario.role)
      if(role === 'Admin'){
          return <Route component={component} path={path} {...rest} />
       }else{
        return <Redirect to="/" {...rest} />
      }
    }



const token = useSelector(store => store.usuario.token)

axios.defaults.headers.common['token'] = token 

  return (
        <Router>
          <Switch>
            <Route component={Login} path="/" exact/>
            <RutaProtegida component={Dashboard} path="/dashboard" exact/>
            <RutaProtegida component={Tickets} path="/tickets" exact/>
            <RutaProtegida component={Detalles} path="/tickets/:id" exact/>
            <RutaProtegida component={Calendar} path="/calendar" exact/>
            <RutaProtegida component={Informe} path="/reportes" exact/>
            <RutaAdmin component={Pendientes} path="/admin/pendientes" exact/>
            <RutaAdmin component={Users} path="/admin/users" exact/>
            <RutaAdmin component={Institution} path="/admin/instituciones" exact/>
          </Switch>
        </Router>
  );
}

export default App;
