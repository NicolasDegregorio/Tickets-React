import React, {useRef} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import MaterialTable from 'material-table'
import { Box, Button, CircularProgress, Chip, Grid, TextField, InputAdornment, Backdrop } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Popup from '../ui/Popup'
import FormAdd from './Forms/FormAdd';
import SimpleCard from '../ui/Card';
import Notification from '../ui/Notification'
import Dashboard from '../dashboard/Dashboard'
import CardMobile from '../ui/CardMobile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));



const Tickets2 = (props) => {
    const divRef = useRef(null);
    const theme = useTheme();
    const classes = useStyles();
    const usuarioId = useSelector(store => store.usuario.usuario.data._id)
    const roleUser = useSelector(store => store.usuario.usuario.data.role)
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [users, setUsers] = React.useState([])
    const [tickets, setTickets] = React.useState([])
    const [institutions, setInstitutions] = React.useState([])
    const [edit, setEdit] = React.useState(false)
    const [id, setId] = React.useState('')
    const [ticketsFilter, setTicketsFilter] = React.useState([])
    const [ticketsFilterMobile, setTicketsFilterMobile] = React.useState([])
    const [openPopup, setOpenPopup] = React.useState(false)
    const [notification, setNotification] = React.useState({open: false, message: ''});
    const [ticket, setTicket] = React.useState({
        institution: '',
        description : '',
        team : {
            _user: '',
            nombre: '',
            role: ''
        },
        start_date: '',
        end_date: '',
        priority: '',
        status:'Sin Solucionar',
      })
      const [loading, setLoading] = React.useState(false);
      const [error,setError] = React.useState(false)
      const [pagePaginator, setPagePaginator] = React.useState(null);
      const [currentPage, setCurrentPage ] = React.useState(null);
      
    React.useEffect( () => {
        const getTickets = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`api/ticket?usuarioId=${usuarioId}`)
                const data = res.data
                setTickets(data)
                setTicketsFilter(data.data)
                setTicketsFilterMobile(data.data.slice(0,10)) 
                setPagePaginator(Math.ceil((data.data.length)/10))
            } catch (error) {
                console.log("ocurrio un error")
                console.log(error)
            }
            setLoading(false)
        }
        const getUsers = async () => {
           try {
                const res = await axios.get('users/users')
                const data = res.data
                setUsers(data)
           } catch (error) {
                console.log("ocurrio un error")
                console.log(error)
           }
        }
        const getInstitutions = async () => {
            try {
                 const res = await axios.get('institutions/institutions')
                 const data = res.data
                 setInstitutions(data)
            } catch (error) {
                 console.log("ocurrio un error")
                 console.log(error)
            }
         }
        getTickets()
        getUsers()
        getInstitutions()
        
        setInterval(() => { 
            getTickets()
            getUsers()
            getInstitutions()
        }, 300000);
    },[])
    
    React.useEffect(() =>{
        divRef.current.scrollIntoView({ block: "start", behavior: 'smooth' });
    },[currentPage]);


    // Crear nuevo Ticket
    const addTicket = async (data) => {      
            setLoading(true)
            let newTicket = {
                institution: data.ticketInstitution._id,
                description: data.ticketDescription,
                team: {
                    _user: data.ticketLeader,
                    role: 'Leader',
                },
                start_date: data.start_date,
                end_date: data.end_date,
                priority: data.ticketPriority,
                status: 'Sin Solucionar'
            }
            try {
                const res = await axios.post('api/nuevo-ticket', newTicket)
                setTicketsFilter([
                    ...ticketsFilter,
                    res.data
                ])
                if (mobile){
                    setTicketsFilterMobile([...ticketsFilterMobile, res.data])
                  }   
                setNotification({ ...notification, open: true, message: "Ticket Creado Correctamente" })
                emptyFields()
                setTickets({ ...tickets, ticketsAll: tickets.ticketsAll + 1 })
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        
        

    }
    // Elimina un Ticket
    const deleteTicket = async data => {
        let ticketsIds = [];
        if(mobile){
            ticketsIds.push(data)
        }else{
            data.map(ticket => ticketsIds.push(ticket._id))
        }
        const countTickets = ticketsIds.length;
        const confirm = window.confirm("Estas Seguro de Eliminar El/Los Registro/s")
        try {
            if(confirm){
                await axios.post('api/ticket/delete/many', ticketsIds)
                const arrayFiltrado = ticketsFilter.filter((ticket) => !ticketsIds.includes(ticket._id))
                setTicketsFilter(arrayFiltrado)
                if (mobile){
                    currentPage === null ?
                        setTicketsFilterMobile(arrayFiltrado.slice(0,10))
                    :
                        setTicketsFilterMobile(arrayFiltrado.slice((currentPage*10)-10,currentPage*10))
                }
                setNotification({...notification, open: true,  message: "Ticket/s Eliminado/s Correctamente"})
                setTickets({...tickets, ticketsAll: tickets.ticketsAll-countTickets})
            }     
        } catch (error) {
            console.log(error)
        }
    }

    const edition = row => {
        setId(row._id)
        setTicket({...ticket,
            institution: row.institution.name,
            description : row.description,
            team : {
                _user: row.team[0]._user._id,
                nombre: row.team[0]._user.nombre,
                role: 'Leader'
            },
            start_date: row.start_date,
            end_date: row.end_date,
            priority: row.priority,
            status: row.status,        
                
        })
        setEdit(true)
        setOpenPopup(true)
    }

    // Actualizar Ticket
    const editTicket =  async (data) => {
        setLoading(true);
        const ticketEdit= {
                        ...(data.ticketInstitution !== undefined && { institution: data.ticketInstitution._id}),
                        description: data.ticketDescription,
                        team : {
                            _user: data.ticketLeader,
                            role: 'Leader',
                        },
                        start_date: data.start_date,
                        end_date: data.end_date,
                        priority: data.ticketPriority,
                        status: data.status
        }
        try {
            const res = await axios.put(`api/ticket/${id}`,ticketEdit)
            const arrayEditado = ticketsFilter.map( item => (
                item._id === id ? res.data : item
            ))
            setTicketsFilter(arrayEditado)
            if (mobile){
                currentPage === null ?
                    setTicketsFilterMobile(arrayEditado.slice(0,10))
                :
                    setTicketsFilterMobile(arrayEditado.slice((currentPage*10)-10,currentPage*10))
            }
            setNotification({...notification, open: true, message: "Ticket Editado Correctamente"})
            emptyFields()
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }
    // Filtrar tickets Mediante las Tarjetas
    const filterTickets = (filtro) => {
        if (filtro === "Todos"){
            mobile ? setTicketsFilterMobile(tickets.data) : setTicketsFilter(tickets.data)
            
        } else if(filtro === "Solucionado") {
            const filter =  tickets.data.filter( (ticket) => ticket.status === "Solucionado")
            mobile ? setTicketsFilterMobile(filter) : setTicketsFilter(filter)     
        }else if(filtro === "Sin Solucionar"){
            const filter =  tickets.data.filter( (ticket) => ticket.status === "Sin Solucionar")
            mobile ? setTicketsFilterMobile(filter) : setTicketsFilter(filter)
        }else if(filtro === "Vencidos"){
            const filter =  tickets.data.filter( (ticket) => (ticket.active === false && ticket.status === 'Sin Solucionar'))
            mobile ? setTicketsFilterMobile(filter) : setTicketsFilter(filter)
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
        setTicket({
            institution: '',
            description : '',
            team : {
                _user: '',
                nombre: '',
                role: 'Leader'
            },
            start_date: '',
            end_date: '',
            priority: '',
            status:'Sin Solucionar',    
        })
        setId('')

    }
    const buscador = (palabra) => {
        if(palabra === ''){
            if(currentPage > 1){
                setTicketsFilterMobile(ticketsFilter.slice((currentPage*10)-10,currentPage*10))
            }else{
                setTicketsFilterMobile(ticketsFilter.slice(0,10))
            }
        }else{
            const palabraMinuscula = palabra.toLowerCase()
            const arrayFiltrado = ticketsFilter.filter(ticket => (
                ticket.institution.name.toLowerCase().indexOf(palabraMinuscula) !== -1 
            ))
            console.log(palabraMinuscula)
      
            setTicketsFilterMobile(arrayFiltrado)
        }
                
      }

      const paginator = (page) => {
        setLoading(true)
        setCurrentPage(page)
        setTicketsFilterMobile(ticketsFilter.slice((page*10)-10,page*10))
        setLoading(false)
      }



    return (
        <div style={{ maxWidth: '100%' }} ref={divRef}>
            <Grid container>
                <Notification 
                    message = {notification.message}
                    open = {notification.open}
                    severity= {"success"}
                    setNotification={setNotification}
                />
                <Grid item={true} md={3} xs={12}>
                    <Box>
                        <SimpleCard
                            typeTickets= "Tickets Totales"
                            totalsTickets= {tickets.ticketsAll}
                            color="#2196f3"
                            action= {filterTickets}
                            typeFilter= "Todos"
                        />
                    </Box>
                </Grid>
                <Grid item={true} md={3} xs={12}>
                    <Box ml={{"md": 3}} mt={{xs:2, sm:2, md:0, lg:0}} >
                        <SimpleCard
                            typeTickets="Tickets Solucionados"
                            totalsTickets={tickets.ticketsSolved}
                            color="#4caf50"
                            action= {filterTickets}
                            typeFilter= "Solucionado"   
                        />
                    </Box>
                </Grid>
                <Grid item={true} md={3} xs={12}>
                    <Box ml={{"md": 3}} mt={{xs:2, sm:2, md:0, lg:0}} >
                        <SimpleCard
                            typeTickets="Tickets Sin Solucionar"
                            totalsTickets={tickets.ticketsUnsolved}
                            color="#ffff70"
                            action= {filterTickets}
                            typeFilter= "Sin Solucionar"
                        />
                    </Box>
                </Grid>
                <Grid item={true} md={3} xs={12}>
                    <Box ml={{"md": 3}} mt={{xs:2, sm:2, md:0, lg:0}}>
                        <SimpleCard
                            typeTickets= "Tickets Vencidos"
                            totalsTickets= {tickets.ticketsExpired}
                            color="#ff1744"
                            action= {filterTickets}
                            typeFilter= "Vencidos"
                        />
                    </Box>
                </Grid>
                
            </Grid>
            <Box mt={2}>
                {roleUser === 'Admin' &&
                    <Button variant="contained" color="primary" onClick={() =>  setOpenPopup(true) }>
                        Nuevo Ticket
                    </Button>
                }
            </Box>
            {mobile && 
                <Box mt={2} display="flex" justifyContent="center">
                    <TextField
                        id="input-with-icon-textfield"
                        label="Buscar por Institucion"
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
            <Box mt={2}>
                <Backdrop className={classes.backdrop} open={loading} onClick={!loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                {mobile ? 
                    <CardMobile 
                        ticketsFilterMobile={ticketsFilterMobile}
                        roleUser={roleUser}
                        edition={edition}
                        deleteTicket={deleteTicket}
                    />
                :
                    <MaterialTable
                        columns={[
                            { title: 'Id', field: '_id', hidden: true},
                            { title: 'Institucion', field: 'institution[name]' },
                            { title: 'Descripcion', field: 'description' },
                            { title: "Prioridad", field: 'priority', lookup: {Alta: "Alta", Media: "Media", Baja: "Baja" } },
                            { title: 'Encargado', field: 'team[0][_user][nombre]' },
                            { title: 'Fecha de Inicio', field: 'start_date',  type: "date", dateSetting: { locale: "es-AR"}},
                            { title: 'Vencimiento', field: 'end_date',  type: "date", dateSetting: { locale: "es-AR"}},
                            {title: 'Estado', field: 'status', lookup: { "Solucionado": "Solucionado", "Sin Solucionar": "Sin Solucionar" },
                            render: rowData => <Chip color={rowData.status === "Solucionado"? "primary": "secondary"} size="small" label={rowData.status} />}
                        ]}
                        data={ticketsFilter}
                        actions={[
                            {
                                icon: () => <VisibilityIcon />,
                                tooltip: 'Ver',
                                position: 'row',
                                onClick: (event, rowData) => props.history.push('/tickets/'+rowData._id),
                            },    
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
                            onClick: (event, rowData) => deleteTicket(rowData),
                            }
                            
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            selection: true,
                            pageSize: 10,
                            filtering: true,
                            exportButton: true
                        }}
                        title="Tickets"
                    />    
                }
            </Box>
            {mobile &&
                <Box ml={-2} mt={2} display="flex" justifyContent="center">
                    <Pagination count={pagePaginator} color="primary" onChange={(e, page) => paginator(page)} />
                 </Box>
            }
            <Popup
                title= {edit ? "Editar Ticket" : "Agregar Ticket"}
                openPopup={openPopup}
                closeForm={closeForm}
                loading={loading}               
            >
               <FormAdd 
                    setTicket={setTicket}
                    ticket={ticket}
                    users={users}
                    institutions={institutions}
                    addTicket={addTicket}
                    editTicket= {editTicket}
                    edit= {edit}
                    setOpenPopup={setOpenPopup}
                    emptyFields={emptyFields}
                />
            </Popup>

        </div>
    )
}
    const Tickets = (props) => {
        return (
            <div>
                <Dashboard section = {"Tickets"}>
                    <Tickets2 history={props.history}>

                    </Tickets2>
                </Dashboard>
            </div>
        )
    }

export default Tickets

