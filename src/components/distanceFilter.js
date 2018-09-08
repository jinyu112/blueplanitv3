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
import CONSTANTS from '../constants.js'

const styles = theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 175,
    left: 33,
    width: '25%',
    padding: '1em',
    'z-index': 9999
  }
});

class ClickAway extends React.Component {

    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    state = {
        openRadius: false,
        value: this.props.maxDistance,
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
        this.setState({openRadius:false});
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
      openRadius: false,
    });
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.setDistance(value);
    //change result display here
  };

  render() {
    const { classes } = this.props;
    const { openRadius } = this.state
    const { value } = this.state;
    var disabled = this.props.resultsPresent;

    var buttonClasses = ['radiusBtn'];

    this.state.value != 0 ? buttonClasses.push('activeStatebtn') : buttonClasses = ['radiusBtn'];

    return (
        <div ref={this.setWrapperRef}>
        <Button disabled={disabled} className={buttonClasses.join(' ')} variant="outlined" onClick={(e) => this.handleClick('openRadius')}>{this.state.value == 0 ? 'Distance' : this.state.value + ' miles'}</Button>
            {openRadius ? (
              <Paper className={classes.paper}>
                <Typography id="label">{CONSTANTS.RADIUS_FILTER_STR}</Typography>
                <Slider value={value} min={0} max={this.props.maxDistance} step={1} onChange={this.handleChange}/>
              </Paper>
            ) : null}
        </div>
    );
  }
}

ClickAway.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClickAway);
