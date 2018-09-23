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
        min: CONSTANTS.ABS_TIMEFILTER_MIN,
        max: CONSTANTS.ABS_TIMEFILTER_MAX,
        value: [CONSTANTS.DEFAULT_TIMEFILTER_MIN, CONSTANTS.DEFAULT_TIMEFILTER_MAX],
        timeRange: ['12:00 AM', '11:59 PM'],
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
            this.setState({ open: false });
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

        if (value < CONSTANTS.NOON) {
            timeOfDay = 'AM';
            switch (value) {
                case 0:
                    time = '12:00'
                    break;
                default:
                    time = Math.round(value/100) + ':00'
            }
        } else {
            timeOfDay = 'PM';
            switch (value) {
                case CONSTANTS.NOON:
                    time = '12:00'
                    break;
                case CONSTANTS.ABS_TIMEFILTER_MAX:
                    time = '11:59';
                    break;
                default:
                    time = Math.round((value - CONSTANTS.NOON)/100) + ':00'
            }
        }

        timeStr.push(time);
        timeStr.push(timeOfDay);

        return timeStr.join(' ');
    }

    handleApply = (props) => {
        var minTimeFloat = parseFloat(this.state.value[0]);
        var maxTimeFloat = parseFloat(this.state.value[1])

        this.props.setTimeRange([minTimeFloat, maxTimeFloat])
        this.setState({
            open: false,
            value: [this.state.value[0], this.state.value[1]]
        })
    };

    handleClear = (props) => {
        this.props.setTimeRange([CONSTANTS.ABS_TIMEFILTER_MIN, CONSTANTS.ABS_TIMEFILTER_MAX,])
        this.setState({
            open: false,
            min: CONSTANTS.ABS_TIMEFILTER_MIN,
            max: CONSTANTS.ABS_TIMEFILTER_MAX,
            value: [CONSTANTS.DEFAULT_TIMEFILTER_MIN, CONSTANTS.DEFAULT_TIMEFILTER_MAX],
            timeRange: ['12:00 AM', '11:59 PM'],
        })
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        var disabled = this.props.resultsPresent;

        var buttonClasses = ['apiBtn'];
        var active = false;

        if (this.state.value[0] != 4 || this.state.value[1] != 20) {
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
                        <Range allowCross={false}  value={this.state.value} className={classes.slider} 
                            defaultValue={[CONSTANTS.DEFAULT_TIMEFILTER_MIN, CONSTANTS.DEFAULT_TIMEFILTER_MAX]}
                            min={this.state.min} max={this.state.max}
                            step={CONSTANTS.TIME_FILTER_STEP}
                            onChange={this.onSliderChange}
                            tipFormatter={this.handleDisplay}
                        />

                        <div className={classes.actions}>
                            <Button href="#text-buttons" className={classes.button} onClick={this.handleClear}>
                                Clear
                            </Button>
                            <Button href="#text-buttons" className={classes.button} onClick={this.handleApply}>
                                Apply
                            </Button>
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
