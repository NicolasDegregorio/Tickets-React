import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Box, Button, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import PrintIcon from '@material-ui/icons/Print';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import esLocale  from 'moment/locale/es';
import moment from 'moment';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Legend,
  } from '@devexpress/dx-react-chart-material-ui';
import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import Dashboard from '../dashboard/Dashboard'

const legendStyles = () => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
    },
  });
  const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
  );
  const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
  const legendLabelStyles = () => ({
    label: {
      whiteSpace: 'nowrap',
    },
  });
  const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
  );
  

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  
const Informe2 = (props) => {
    moment.locale('es', esLocale);
    const theme = useTheme();
    const classes = useStyles();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const usuarioId = useSelector(store => store.usuario.usuario.data._id)
    const role = useSelector(store => store.usuario.role)
    const userName = useSelector(store => store.usuario.usuario.data.nombre)
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());
    const [focusedInput, setFocusedInput] = useState(null);
    const [data, setData] = useState([])
    const [chartData, setCharData] = useState([])
    const orientation = window.matchMedia("(max-width: 700px)").matches ? 'vertical' : 'horizontal';
    
    useEffect(() => {
        setCharData([]);
        dateRange();
    },[startDate, endDate ])

    useEffect(() => {
        data.map((data) => (
            setCharData(prevState => 
                [...prevState,{ mes:  `${moment.months(data._id.mes - 1)} - ${data._id.anio} `, solucionado: data.solucionado, noSolucionado: data.noSolucionado }])
        ))

    },[data])
    
     const dateRange = async () => {
            try {
                 const res = await axios.get(`api/range-date?usuarioId=${usuarioId}&startDate=${startDate}&endDate=${endDate}&role=${role}`)
                 setData(res.data)
                 
                 
            } catch (error) {
                console.log(error)
            }
    }
    const generateReport = async () =>{
        let noSolucionado = data.reduce( (a,b) => a  + b.noSolucionado, 0)
        let solucionado = data.reduce( (a,b) => a  + b.solucionado, 0)
        let total = noSolucionado + solucionado
        const ticketPDF = {
            noSolucionado: noSolucionado,
            solucionado: solucionado,
            total: total,
            userName : userName,
            role: role,
            startDate : startDate._d,
            endDate: endDate._d
        }
        console.log(noSolucionado)
        try {
            const res =  await axios.post('api/pdf',ticketPDF, {responseType: 'blob'})
            //Create a Blob from the PDF Stream
                const file = new Blob(
                    [res.data], 
                    {type: 'application/pdf'});
            //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
                window.open(fileURL);
                console.log(file)
        } catch (error) {
            console.log(error)
        }
        
        
    }

    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Box display="flex" justifyContent={mobile ? "center" : "flex-start"}>
                        <DateRangePicker
                            startDate={startDate}
                            startDateId="s_id"
                            endDate={endDate}
                            endDateId="e_id"
                            onDatesChange={({ startDate, endDate }) => { setStartDate(startDate); setEndDate(endDate); }}
                            focusedInput={focusedInput}
                            onFocusChange={e => setFocusedInput(e)}
                            displayFormat="DD/MM/YYYY"
                            isOutsideRange={() => false}
                            withPortal={true} 
                            orientation={orientation} 
                            autoFocus
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box display="flex" justifyContent={mobile? "center" : "flex-end"}>
                        <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<PrintIcon />}
                        onClick = {() => generateReport()}
                        >
                            Generar Informe
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                   <Box mt={2}>
                    <Paper variant="outlined">
                            <Chart
                            data={chartData}
                            >
                                <ArgumentAxis />
                                <ValueAxis />

                                <BarSeries
                                    name="Solucionado"
                                    valueField="solucionado"
                                    argumentField="mes"
                                    color="#0FFF04"
                                />
                                <BarSeries
                                    name="No Solucionado"
                                    valueField="noSolucionado"
                                    argumentField="mes"
                                    color="#FF0404"
                                />
                                <Animation />
                                <Legend position="bottom" rootComponent={Root}  />
                                <Title text="Situacion Tickets" />
                                <Stack />
                            </Chart>
                        </Paper>
                   </Box>
                </Grid>
            </Grid>
        </Fragment>
    )
}

const Informe = () =>{
    return (
        <Dashboard section={"Reportes Detallados"}>
            <Informe2>

            </Informe2>
        </Dashboard>
    )
    
}

export default Informe
