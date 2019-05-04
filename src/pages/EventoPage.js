import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fetch from '../script/Fetch.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  Calendar,
  usePickerState,
} from "@material-ui/pickers";

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EventoPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            eventi: [],
            open: false,
            id: null,
            dataInizio: new Date(),
            maxDate: new Date(),
            minDate: new Date(),
        }
    }

    componentDidMount(){
        Fetch.getEventi()
            .then(res => this.setState({eventi: this.state.eventi.concat(res)}))
    }

    handlePrenotazione(elemento){
        this.setState({
            open: true, 
            id: elemento.id_evento,
            minDate: elemento.dataInizio,
            maxDate: elemento.dataFine,
            });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render(){
        const { classes } = this.props;

        console.log(this.state.eventi)

        let jsx = 
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Prenotazione"}
          </DialogTitle>
          <DialogContent>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Calendar {...{date: this.state.dataInizio, onChange:(date, isFinish)=>{this.setState({dataInizio: date})}}}
                maxDate = {this.state.maxDate}
                minDate = {this.state.minDate}
                />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>


        return (
            <div>
            {jsx}
            <Grid container spacing={24}>
            {this.state.eventi.map((elemento) =>
                <Grid item xs spacing = {12}>
                <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                    {elemento.nome}  {elemento.cognome}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>this.handlePrenotazione(elemento)}>Prenotati</Button>
                </CardActions>
                </Card>
            </Grid>
            )}
            </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(EventoPage);