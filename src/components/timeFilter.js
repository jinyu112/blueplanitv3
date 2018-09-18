import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CONSTANTS from '../constants';
import 'rc-slider/assets/index.css';

import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const styles = theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 175,
    width: '25%',
    maxWidth: '320px',
    padding: '1em 2em',
    textAlign: 'left',

  },
  slider: {
    zIndex: '9999',
  },
  header: {
    marginBottom: '2em',
    fontSize: '1em',
  },
  span: {
      float: 'right',
      color: CONSTANTS.PRIMARY_COLOR,
  },
  actions: {
      marginTop: '2em',
      fontSize: '0.9em',
  },
  apply: {
      float: 'right',
  },
  clear: {
      float: 'left',
  }
});

class TimeSlider extends React.Component {

    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    state = {
      open: false,
      min: 0,
      max: 24,
      value: [4, 20],
      timeRange: ['4:00 AM', '8:00 PM'],
    };

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

    onSliderChange = (value) => {
        this.setState({
            value: value,
        }, this.setTimeRange)
        // sort results here
    }

    setTimeRange = () => {
        var startTime = this.handleDisplay(this.state.value[0]);
        var endTime = this.handleDisplay(this.state.value[1]);
        this.setState({
            timeRange: [startTime, endTime]
        })
    }

    handleDisplay = (value) => {

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

         return timeStr.join(' ');
    }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    var disabled = this.props.resultsPresent;

    var buttonClasses = ['apiBtn'];
    var active = false;

    if(this.state.value[0] != 4 || this.state.value[1] != 20) {
        active = true;
    } else {
        active = false;
    }
    active ? buttonClasses.push('activeStatebtn') : buttonClasses = ['apiBtn'];

    return (
        <div ref={this.setWrapperRef}>
            <Button disabled={disabled} className={buttonClasses.join(' ')} variant="outlined" onClick={(e) => this.handleClick('open')}>TIMES  </Button>
                {open ? (
                  <Paper className={classes.paper}>
                      <Typography className={classes.header}>Time <span className={classes.span}>{this.state.timeRange[0]} - {this.state.timeRange[1]}</span></Typography>
                      <Range allowCross={false} className={classes.slider} defaultValue={[4, 20]} min={this.state.min} max={this.state.max}
                        onChange={this.onSliderChange}
                        tipFormatter={this.handleDisplay}
                      />

                      <div className={classes.actions}>
                          <a className={classes.clear} href="">Clear</a>
                          <a className={classes.apply} href="">Apply</a>
                      </div>
                  </Paper>
                ) : null}
        </div>
    );
  }
}

TimeSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeSlider);
