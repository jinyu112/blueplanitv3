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
    left: 150,
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
    value: false,
    eb:true,
    gp:true,
    yp:true,
    sg:true
  };

  handleClick = (filter_state) => {
    var objectState = {};
    var currentState = this.state[filter_state];
    objectState[filter_state] = !currentState;
    this.setState(objectState);
  };


  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, function () {
        if(!this.state.eb || !this.state.gp || !this.state.yp || !this.state.sg) {
            this.setState({ value: true });
        } else {
            this.setState({ value: false });
        }
    });

    // send information to parent


  };

  render() {
    const { classes } = this.props;
    const { open } = this.state
    const { value } = this.state;
    var disabled = this.props.resultsPresent;

    var buttonClasses = ['apiBtn'];

    this.state.value != 0 ? buttonClasses.push('activeStatebtn') : buttonClasses = ['apiBtn'];

    return (
        <div ref={this.setWrapperRef}>
            <Button disabled={disabled} className={buttonClasses.join(' ')} variant="outlined" onClick={(e) => this.handleClick('open')}>SOURCES</Button>
                {open ? (
                  <Paper className={classes.paper}>
                    <Typography id="label">Include events & places from: </Typography>
                        <FormControl component="fieldset">
                           <FormGroup>
                             <FormControlLabel
                               control={
                                 <Switch
                                   checked={this.state.eb}
                                   onChange={this.handleChange('eb')}
                                   value="eb"
                                   color="primary"
                                 />
                               }
                               label="Eventbrite"
                             />
                             <FormControlLabel
                               control={
                                 <Switch
                                   checked={this.state.yp}
                                   onChange={this.handleChange('yp')}
                                   value="yp"
                                   color="primary"
                                 />
                               }
                               label="Yelp"
                             />
                             <FormControlLabel
                               control={
                                 <Switch
                                   checked={this.state.gp}
                                   onChange={this.handleChange('gp')}
                                   value="gp"
                                   color="primary"
                                 />
                               }
                               label="Google Places"
                             />
                             <FormControlLabel
                               control={
                                 <Switch
                                   checked={this.state.sg}
                                   onChange={this.handleChange('sg')}
                                   value="sg"
                                   color="primary"
                                 />
                               }
                               label="SeatGeek"
                             />
                           </FormGroup>
                         </FormControl>
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
