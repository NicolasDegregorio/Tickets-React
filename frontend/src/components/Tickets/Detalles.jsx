import React from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TabsCentered from '../ui/TabsCentered';
import {useParams} from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'

const Detalles2 = () => {
    const usuarioId = useSelector(store => store.usuario.usuario.data._id)
    const [users, setUsers] = React.useState([])
    const [ticketInfo, setTicketInfo] = React.useState({})
    const [responsible, setResponsible] = React.useState([])
    const [institution, setInsitutiton] = React.useState([])
    const [institutionAddress, setInstitutionAddress] = React.useState([])
    const [comments, setComments] = React.useState([])
    const {id} = useParams()
    const [ticketId, setTicketId] = React.useState(id)
    React.useEffect(() => {
      const ticketData = async (id) =>{
        try {
          const res = await axios.get(`api/ticket/${id}`)
          const data = res.data
          setTicketInfo(data)
          setResponsible(data.team)
          setComments(data.comments)
          setInsitutiton(data.institution)
          setInstitutionAddress(data.institution.address)
        } catch (error) {
          console.log(error)
        }
      }
      const getUsers = async () => {
        try {
             const res = await axios.get('users/users')
             const data = res.data
             setUsers(data)
             console.log(users)
        } catch (error) {
             console.log("ocurrio un error")
             console.log(error)
        }
      }
      ticketData(ticketId)
      getUsers()

    },[])
    return (
      <React.Fragment>
            <TabsCentered
              ticket = {ticketInfo}
              setTicket = {setTicketInfo}
              responsible = {responsible}
              setResponsible = {setResponsible}
              usuarioId = {usuarioId}
              comments = {comments}
              users = {users}
              institution={institution}
              institutionAddress={institutionAddress}
            >
          </TabsCentered>
      </React.Fragment>
    );
  }
  const Detalles = () => {
    return (
        <div>
            <Dashboard section={"Detalles del Ticket"}>
                <Detalles2>

                </Detalles2>
            </Dashboard>
        </div>
    )
  }

export default Detalles
