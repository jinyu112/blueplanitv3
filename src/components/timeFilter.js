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

const styles = theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 175,
    left: 262,
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
    startValue: 0,
    endValue: 0,
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
       console.log(event.target.id, value);
     var objectState = {
          [event.target.id] : value,
     }

    this.setState(objectState);
    //change result display here
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state
    const { startValue } = this.state;
    const { endValue } = this.state;
    var disabled = this.props.resultsPresent;

    var buttonClasses = ['apiBtn'];

    this.state.startValue != 0 ? buttonClasses.push('activeStatebtn') : buttonClasses = ['apiBtn'];

    return (
        // <ClickAwayListener onClickAway={this.handleClickAway}>
        //     </ClickAwayListener>
        <div ref={this.setWrapperRef}>
            <Button disabled={disabled} className={buttonClasses.join(' ')} variant="outlined" onClick={(e) => this.handleClick('open')}>TIMES</Button>
                {open ? (
                  <Paper className={classes.paper}>
                      <div>
                          <Typography id="label">Start Time</Typography>
                          <Slider value={startValue} id="startValue" min={0} max={24} step={1} onChange={this.handleChange}/>
                      </div>
                      <div>
                          <Typography id="label">End Time</Typography>
                          <Slider value={endValue} id="endValue" min={0} max={24} step={1} onChange={this.handleChange}/>
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
