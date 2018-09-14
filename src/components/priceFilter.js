import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
    width: '35%',
    padding: '2em 2em 3em',
  },
  slider: {
    zIndex: '9999',
  },
  header: {
    marginBottom: '1em',
  }
});

class PriceSlider extends React.Component {

    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    state = {
      open: false,
      min: 0,
      max: 500,
      value: [],
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
        })
        // sort results here
    }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const { startValue } = this.state;
    const { endValue } = this.state;
    var disabled = this.props.resultsPresent;

    var buttonClasses = ['apiBtn'];


    this.state.value != [175,300] || this.state.value != []  ? buttonClasses.push('activeStatebtn') : buttonClasses = ['apiBtn'];

    return (
        <div ref={this.setWrapperRef}>
            <Button disabled={disabled} className={buttonClasses.join(' ')} variant="outlined" onClick={(e) => this.handleClick('open')}>PRICE</Button>
                {open ? (
                  <Paper className={classes.paper}>
                      <Typography className={classes.header}>Choose A Price Range</Typography>
                      <Range className={classes.slider} defaultValue={[175, 300]} min={this.state.min} max={this.state.max}
                        onChange={this.onSliderChange}
                        tipFormatter={value => `$${value}.00`}
                      />
                  </Paper>
                ) : null}
        </div>
    );
  }
}

PriceSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export default withStyles(styles)(PriceSlider);
