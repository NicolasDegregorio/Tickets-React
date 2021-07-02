import React, {Fragment, useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import Dashboard from '../dashboard/Dashboard'


const Calendar2 = () => {
    const usuarioId = useSelector(store => store.usuario.usuario.data._id)
    const [tickets, setTickets] = useState([])
    const [events, setEvents] = useState([])
    const buttons = window.matchMedia("(max-width: 700px)").matches ? {center: '',right:  'prev,next'} : {center: 'dayGridWeek dayGridMonth listWeek'};
    React.useEffect( () => {
        const getTickets = async () =>{  
           try {
                const res = await axios.get(`api/ticket?usuarioId=${usuarioId}`)
                setTickets(res.data.data)
           } catch (error) {
               console.log("ocurrio un error")
               console.log(error)
           }
        }
        getTickets()
    }, [])

    React.useEffect( () =>  {
        tickets.map((ticket) => (
            (ticket.status === 'Sin Solucionar') &&
            setEvents(prevState => 
                [...prevState, { title: ticket.institution.name , start: ticket.start_date, end: ticket.end_date, url: `/tickets/${ticket._id}`, backgroundColor : ticket.active ? '#165CFF' : '#FF2416', borderColor: ticket.active === false && '#FF2416' }])
        ))
    },[tickets])
    return (
        <Fragment>
            <FullCalendar
                plugins={[ dayGridPlugin, listPlugin, dayGridPlugin   ]}
                headerToolbar= {
                    buttons
                }
                initialView="dayGridMonth"
                height =  "auto"
                locale={esLocale}
                events={events}
                showNonCurrentDates={false}
                
            />
        </Fragment>
    )
}

const Calendar = () => {
    return (
        <Dashboard section={"Calendario de Tareas"}>
            <Calendar2>

            </Calendar2>
        </Dashboard>
    )

}

export default Calendar
