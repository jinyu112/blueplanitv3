import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import globalStyles from '../App.css';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import StartSlider from './startSlider';
import EndSlider from './endSlider';

import 'rc-slider/assets/index.css';

import ReactDOM from 'react-dom';
import Slider from 'rc-slider';


const styles = theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 175,
    left: 262,
    width: '35%',
    padding: '1em 3em',
    'z-index': 9999
  }
});

class ClickAway extends React.Component {

    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

  componentDidMount() {
     document.addEventListener('mousedown', this.handleClickOutside);
   }

   componentWillUnmount() {
     document.removeEventListener('mousedown', this.handleClickOutside);
   }

   setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({open:false});
    }
  }

  state = {
    open: false,
    min: 0,
    max: 0,
    timeDisplay: '12:00 AM',
    endTimeDisplay: '12:00 AM',
  };

  handleClick = (filter_state) => {
    var objectState = {};
    var currentState = this.state[filter_state];
    objectState[filter_state] = !currentState;
    this.setState(objectState);
  };

  handleClickAway = (props) => {
  this.setState({
      open: false,
    });
  };

  handleChange = (event, value) => {

    var timeStr = [];
    var timeOfDay = ''
    var time = '';

     if(value < 12) {
         timeOfDay = 'AM';
         switch (value) {
            case 0:
                time = '12:00'
                break;
             default:
                time = value + ':00'
         }
     } else {
         timeOfDay = 'PM';
         switch (value) {
            case 12:
                time = '12:00'
                break;
            case 24:
                time = '11:59';
                break;
             default:
                time = (value - 12) + ':00'
         }
     }

     timeStr.push(time);
     timeStr.push(timeOfDay);

     this.setState(
         { timeDisplay: timeStr.join(' '), startValue: value }, () => {
            if((this.state.endValue >= 0 || this.state.startValue >= 0) && (this.state.endValue <= 24 || this.state.startValue <= 24)) {
                 if(this.state.endValue < this.state.startValue || this.state.endValue == this.state.startValue ) {
                    if(this.state.startValue + 2 <= 24) {
                        this.handleChangeEnd(event, this.state.startValue + 2);
                        this.setState({endValue: this.state.startValue + 2});
                    }
                 }
            }
         }
     );

  };

  handleChangeEnd = (event, value) => {

    var timeStr = [];
    var timeOfDay = ''
    var time = '';

     if(value < 12) {
         timeOfDay = 'AM';
         switch (value) {
            case 0:
                time = '12:00'
                break;
             default:
                time = value + ':00'
         }
     } else {
         timeOfDay = 'PM';
         switch (value) {
            case 12:
                time = '12:00'
                break;
            case 24:
                time = '11:59';
                break;
             default:
                time = (value - 12) + ':00'
         }
     }

     timeStr.push(time);
     timeStr.push(timeOfDay);

     this.setState(
         { endTimeDisplay: timeStr.join(' '), endValue: value }, () => {
             if((this.state.endValue >= 0 || this.state.startValue >= 0) && (this.state.endValue <= 24 || this.state.startValue <= 24)) {
                 if(this.state.endValue < this.state.startValue || this.state.endValue == this.state.startValue) {
                    if(this.state.endValue + 2 <= 0) {
                        this.handleChange(event, this.state.endValue - 2);
                        this.setState({startValue: this.state.endValue - 2});
                    }
                 }
             }
         }
     );
  };



  render() {
    const { classes } = this.props;
    const { open } = this.state
    const { startValue } = this.state;
    const { endValue } = this.state;
    var disabled = this.props.resultsPresent;

    var buttonClasses = ['apiBtn'];

    this.state.startValue != 0 && this.state.endValue != 0 ? buttonClasses.push('activeStatebtn') : buttonClasses = ['apiBtn'];

    return (
        <div ref={this.setWrapperRef}>
            <Button disabled={disabled} className={buttonClasses.join(' ')} variant="outlined" onClick={(e) => this.handleClick('open')}>TIMES</Button>
                {open ? (
                  <Paper className={classes.paper}>
                      <div>
                          <StartSlider timeDisplay={this.state.timeDisplay} startTime={this.state.startValue} onChange={this.handleChange}/>
                      </div>
                      <div>
                          <EndSlider endTimeDisplay={this.state.endTimeDisplay} endTime={this.state.endValue} onChange={this.handleChangeEnd}/>
                      </div>
                  </Paper>
                ) : null}
        </div>
    );
  }
}

ClickAway.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export default withStyles(styles)(ClickAway);
