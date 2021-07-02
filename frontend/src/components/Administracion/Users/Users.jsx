import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Box, Button, CircularProgress, Grid, TextField, InputAdornment, Backdrop} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table'
import FormAddEdit from './Forms/Add-Edit'
import Popup from '../../ui/Popup'
import Notification from '../../ui/Notification'
import Dashboard from '../../dashboard/Dashboard'
import CardMobileUsers from '../../ui/CardMobileUsers';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


const Users2 = () => {
    const theme = useTheme();
    const classes = useStyles();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const roleUser = useSelector(store => store.usuario.usuario.data.role)
    const [openPopup, setOpenPopup] = useState(false);
    const [notification, setNotification] = React.useState({open: false, message: ''});
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        role: '',
        email: '',
    });
    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [usersMobile, setUsersMobile] = useState([]);
    const [pagePaginator, setPagePaginator] = React.useState(null);
    const [currentPage, setCurrentPage ] = React.useState(null);

    useEffect(() => {
        const getUsers = async () =>{
            setLoading(true)
            const res =  await axios.get('users/users')
            setUsersMobile(res.data.slice(0,10))
            setPagePaginator(Math.ceil((res.data.length)/10))
            setUsers(res.data)
            setLoading(false)
        }
        getUsers();
    },[])

    const addUser = async (data) => {
        setLoading(true)
        const newUser = {
            name: data.userName,
            lastName: data.userLastName,
            email: data.userEmail,
            password: data.userPassword,
            role: data.userRole
        }
        try {
            const res = await axios.post('users/users', newUser)
            setUsers([
                ...users,
                res.data
            ])
            if (mobile){
                setUsersMobile([...usersMobile, res.data])
              }   
            setNotification({...notification, open: true,  message: "Usuario Creado Correctamente"})
            emptyFields()
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const edition = (row) => {
        setId(row._id)
        setUser({
            name: row.nombre,
            lastName: row.lastName,
            email: row.email,
            role: row.role
        })
        setEdit(true)
        setOpenPopup(true)
        console.log(user)
    }

    // Actualizar Usuario
    const editUser =  async (data) => {
        setLoading(true)
        const userEdit = {
            name: data.userName,
            lastName: data.userLastName,
            email: data.userEmail,
            password: data.userPassword,
            role: data.userRole
        }
        try {
            const res = await axios.put(`users/users/${id}`,userEdit)
            const arrayEditado = users.map( user => (
                user._id === id ? res.data : user
            ))
            console.log(res.data)
            setUsers(arrayEditado)
            if (mobile){
                currentPage === null ?
                    setUsersMobile(arrayEditado.slice(0,10))
                :
                    setUsersMobile(arrayEditado.slice((currentPage*10)-10,currentPage*10))
            }
            setNotification({...notification, open: true, message: "Usuario Editado Correctamente"})
            emptyFields()
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async data => {
        let usersIds = [];
        if(mobile){
            usersIds.push(data)
        }else{
            data.map(user => usersIds.push(user._id))
        }
        const confirm = window.confirm("Estas Seguro de Eliminar El/Los Registro/s")
        try {
            if(confirm){
                await axios.post('users/users/delete/many', usersIds)
                const arrayFiltrado = users.filter((user) => !usersIds.includes(user._id))
                setUsers(arrayFiltrado)
                if (mobile){
                    currentPage === null ?
                        setUsersMobile(arrayFiltrado.slice(0,10))
                    :
                        setUsersMobile(arrayFiltrado.slice((currentPage*10)-10,currentPage*10))
                }
                setNotification({...notification, open: true,  message: "Usuario/s Eliminado/s Correctamente"})
            }     
        } catch (error) {
            console.log(error)
        }
    }

    // Cerrar formulario flotante
    const closeForm = () => {
        setOpenPopup(false)
        setEdit(false)
    }
    // Devuelve el estado del Ticket a situacion inicial
    const emptyFields = () =>{
        closeForm()
        setUser({
            name: '',
            lastName: '',
            role: '',
            email: ''
        })
        setId('')

    }

    const paginator = (page) => {
        setLoading(true)
        setCurrentPage(page)
        setUsersMobile(users.slice((page*10)-10,page*10))
        setLoading(false)
    }

    const buscador = (palabra) => {
        if(palabra === ''){
            if(currentPage > 1){
                setUsersMobile(users.slice((currentPage*10)-10,currentPage*10))
            }else{
                setUsersMobile(users.slice(0,10))
            }
        }else{
            const palabraMinuscula = palabra.toLowerCase()
            const arrayFiltrado = users.filter(user => (
                user.nombre.toLowerCase().indexOf(palabraMinuscula) !== -1 
            ))
            setUsersMobile(arrayFiltrado)
        }         
      }
    return (
        <Fragment>
            <Grid container spacing={1}>
                <Grid item sm={12}> 
                    <Box>
                        <Button variant="contained" color="primary" onClick={() =>  setOpenPopup(true)}>
                            Nuevo Usuario
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {mobile && 
                        <Box mt={2} display="flex" justifyContent="center">
                            <TextField
                                id="input-with-icon-textfield"
                                label="Buscar por Nombre"
                                onChange={(e) => buscador(e.target.value)}
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <SearchIcon />
                                    </InputAdornment>
                                ),
                                }}
                            />
                        </Box>
                    }
                </Grid>
                <Grid item sm={12}>
                    <Box mt={2}>
                        <Backdrop className={classes.backdrop} open={loading} onClick={!loading}>
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            {mobile ?
                                <CardMobileUsers 
                                    usersMobile={usersMobile}
                                    edition={edition}
                                    deleteUser={deleteUser}
                                />
                            :
                            <MaterialTable
                                columns={[
                                    { title: 'Id', field: '_id', hidden: true},
                                    { title: 'Nombre', field: 'nombre' },
                                    { title: 'Apellido', field: 'lastName' },
                                    { title: "role", field: 'role'},
                                    { title: 'email', field: 'email' },
                                ]}
                                data={users}
                                actions={[
                                    {
                                    hidden: roleUser !== 'Admin',
                                        icon: 'edit',
                                        tooltip: 'Editar',
                                        position: 'row',
                                        onClick: (event, rowData) => edition(rowData),
                                    },
                                    {
                                        hidden: roleUser !== 'Admin',
                                        icon: () => <DeleteIcon />,
                                        position: 'toolbarOnSelect',
                                        tooltip: 'Borrar',
                                        onClick: (event, rowData) => deleteUser(rowData),
                                    }
                                ]}
                                options={{
                                    actionsColumnIndex: -1,
                                    selection: true,
                                    pageSize: 10
                                }}
                                title="Usuarios"
                            />
                        }
                    </Box>
                </Grid>
            </Grid>
            {mobile &&
                <Box ml={-2} mt={2} display="flex" justifyContent="center">
                    <Pagination count={pagePaginator} color="primary" onChange={(e, page) => paginator(page)} />
                 </Box>
            }

            <Notification 
                    message = {notification.message}
                    open = {notification.open}
                    severity= {"success"}
                    setNotification={setNotification}
            />
            <Popup
               openPopup={openPopup}  
               title= {edit ? "Editar Usuario" : "Agregar Usuario"} 
               closeForm={closeForm}  
               loading={loading}         
            >
               <FormAddEdit
                edit={edit}
                user={user}
                addUser = {addUser}
                editUser = { editUser} 
                emptyFields={emptyFields}  
                />
            </Popup>
        </Fragment>
    )
}

const Users = () => {
    return (
        <div>
            <Dashboard section={"Usuarios"}>
                <Users2>

                </Users2>
            </Dashboard>
        </div>
    )
  }

export default Users
