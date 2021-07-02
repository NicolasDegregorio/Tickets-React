import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Box, Button, CircularProgress, Grid, TextField, InputAdornment, Backdrop} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import MaterialTable from 'material-table'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import FormAddEdit from './Forms/Add-Edit';
import Popup from '../../ui/Popup';
import Notification from '../../ui/Notification';
import Dashboard from '../../dashboard/Dashboard';
import CardMobileIns from '../../ui/CardMobileIns';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const Institution2 = () => {
    const roleUser = useSelector(store => store.usuario.usuario.data.role)
    const theme = useTheme();
    const classes = useStyles();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [notification, setNotification] = useState({open: false, message: ''});
    const [institution, setInstitution] = useState({
        name: '',
        address: '',
        cue: '',
    });
    const [institutions, setInstitutions] = useState([])
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState('');
    const [dataAddress, setDataAddress] = useState({})
    const [institutionMobile, setInstitutionMobile] = React.useState([]);
    const [pagePaginator, setPagePaginator] = React.useState(null);
    const [currentPage, setCurrentPage ] = React.useState(null);
    useEffect(() => {
        const getInstitutions = async () =>{
           setLoading(true) 
           const res =  await axios.get('institutions/institutions')
                    setInstitutions(res.data)
           setInstitutionMobile(res.data.slice(0,10))
           setPagePaginator(Math.ceil((res.data.length)/10))
           setLoading(false) 
        }
        getInstitutions();
        
    },[])

    const addInstitution = async (data) => {
        setLoading(true) 
        const newInstituion = {
            name: data.institutionName,
            //addres: data.institutionAddres,
            address: dataAddress,
            cue: data.institutionCue,
        }
        try {
            const res = await axios.post('institutions/institutions', newInstituion)
            setInstitutions([
                ...institutions,
                res.data
            ])
            if (mobile){
              setInstitutionMobile([...institutionMobile, res.data])
            }   
            setNotification({...notification, open: true,  message: "Institucion Creada Correctamente"})
            emptyFields()
            setLoading(false) 
        } catch (error) {
            console.log(error)
        }
    }

    const edition = (row) => {
        setId(row._id)
        setInstitution({
            name: row.name,
            address: row.address,
            cue: row.cue,
        })
        setEdit(true)
        setOpenPopup(true)
    }

    // Actualizar Institucion
    const editInstitution =  async (data) => {
        setLoading(true) 
        const instituionEdit = {
            name: data.institutionName,
            address: dataAddress,
            //address: data.institutioAddres,
            cue: data.institutionCue,
        }
        try {
            const res = await axios.put(`institutions/institutions/${id}`, instituionEdit)
            const arrayEditado = institutions.map( institution => (
                institution._id === id ? res.data : institution
            ))
            setInstitutions(arrayEditado)
            if (mobile){
                currentPage === null ?
                    setInstitutionMobile(arrayEditado.slice(0,10))
                :
                    setInstitutionMobile(arrayEditado.slice((currentPage*10)-10,currentPage*10))
            }
            setNotification({...notification, open: true, message: "Institucion Editada Correctamente"})
            emptyFields()
            setLoading(false) 
        } catch (error) {
            console.log(error)
        }
    }

    const deleteInstitutions = async data => {
        let institutionsIds = [];
        if(mobile){
            institutionsIds.push(data)
        }else{
            data.map(institution => institutionsIds.push(institution._id))
        }
        const confirm = window.confirm("Estas Seguro de Eliminar El/Los Registro/s")
        try {
            if(confirm){
                await axios.post('institutions/institutions/delete/many', institutionsIds)
                const arrayFiltrado = institutions.filter((institution) => !institutionsIds.includes(institution._id))
                setInstitutions(arrayFiltrado)
                if (mobile){
                    currentPage === null ?
                        setInstitutionMobile(arrayFiltrado.slice(0,10))
                    :
                        setInstitutionMobile(arrayFiltrado.slice((currentPage*10)-10,currentPage*10))
                }
                setNotification({...notification, open: true,  message: "Intitucion/es Eliminada/s Correctamente"})
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
    // Devuelve el estado de la institution a situacion inicial
    const emptyFields = () =>{
        closeForm()
        setInstitution({
            name: '',
            address: '',
            cue: '',
        })
        setId('')
    }

    const paginator = (page) => {
        setLoading(true)
        setCurrentPage(page)
        setInstitutionMobile(institutions.slice((page*10)-10,page*10))
        setLoading(false)
    }

    const buscador = (palabra) => {
        if(palabra === ''){
            if(currentPage > 1){
                setInstitutionMobile(institutions.slice((currentPage*10)-10,currentPage*10))
            }else{
                setInstitutionMobile(institutions.slice(0,10))
            }
        }else{
            const palabraMinuscula = palabra.toLowerCase()
            const arrayFiltrado = institutions.filter(institution => (
                institution.name.toLowerCase().indexOf(palabraMinuscula) !== -1 
            ))
            setInstitutionMobile(arrayFiltrado)
        }         
      }
    return (
        <Fragment>
            <Grid container spacing={1}>
                <Grid item sm={12}> 
                    <Box>
                        <Button variant="contained" color="primary" onClick={() =>  setOpenPopup(true)}>
                            Nueva Institucion
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item sm={12}>
                    <Box mt={2}>
                        <Backdrop className={classes.backdrop} open={loading} onClick={!loading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        {mobile ?
                            <CardMobileIns 
                                institutionMobile={institutionMobile}
                                edition={edition}
                                deleteInstitutions={deleteInstitutions}
                            />
                        :
                        <MaterialTable
                            columns={[
                                { title: 'Id', field: '_id', hidden: true},
                                { title: 'Nombre', field: 'name' },
                                { title: 'Direccion', field: 'address.name' },
                                { title: "CUE", field: 'cue'},
                                {title: "Departamento", field: 'address.department'},
                                {title: "Localidad", field: 'address.locality'},
                            ]}
                            data={institutions}
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
                                    onClick: (event, rowData) => deleteInstitutions(rowData),
                                }
                              ]}
                            options={{
                                actionsColumnIndex: -1,
                                selection: true,
                                pageSize: 10
                            }}
                            title="Instituciones"
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
               title= {edit ? "Editar Institucion" : "Agregar Institucion"} 
               closeForm={closeForm}  
               loading={loading}          
            >
               <FormAddEdit
                edit={edit}
                institution={institution}
                addInstitution = {addInstitution}
                editInstitution = { editInstitution} 
                emptyFields={emptyFields}
                setDataAddress={setDataAddress}  
                />
            </Popup>
        </Fragment>
    )
}

const Institution = () => {
    return (
        <div>
            <Dashboard section={"Instituciones"}>
                <Institution2>

                </Institution2>
            </Dashboard>
        </div>
    )
  }

export default Institution
