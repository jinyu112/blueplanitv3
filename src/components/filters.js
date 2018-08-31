import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import globalStyles from '../App.css'

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'grid',
    'grid-template-columns': 'repeat(10, 1fr)',
    'grid-gap': '15px',
    padding: '1.5em 2.1em',
    'max-width': 1080,
  },
  paper: {
    position: 'absolute',
    top: 70,
    left: 33,
  },
  paper2: {
    position: 'absolute',
    top: 70,
    left: 136,
  },
  paper3: {
    position: 'absolute',
    top: 70,
    left: 239,
  },
  fake: {
    backgroundColor: grey[200],
    height: theme.spacing.unit,
    margin: theme.spacing.unit * 2,
    // Selects every two elements among any group of siblings.
    '&:nth-child(2n)': {
      marginRight: theme.spacing.unit * 3,
    },
  },
  btn: {
      'max-width': 100,
  }
});

class ClickAway extends React.Component {
  state = {
    openRadius: false,
    openApi: false,
    openMeal: false,
  };

  handleClick = (filter_state) => {
    var objectState = {};
    var currentState = this.state[filter_state];
    objectState[filter_state] = !currentState;
    this.setState(objectState);
  };

  handleClickAway = () => {
    this.setState({
      openRadius: false,
      openApi: false,
      openMeal: false
    });
  };

  render() {
    const { classes } = this.props;
    const { openRadius, openApi, openMeal } = this.state;
    const fake = <div className={classes.fake} />;

    return (
      <div className={classes.root}>
        <ClickAwayListener  onClickAway={this.handleClickAway}>
            <Button className={classes.btn} variant="outlined" onClick={(e) => this.handleClick('openRadius')}>Distance</Button>
            {openRadius ? (
              <Paper className={classes.paper}>
                meow
              </Paper>
            ) : null}

            <Button className={classes.btn} variant="outlined" onClick={(e) => this.handleClick('openApi')}>SOURCES</Button>
            {openApi ? (
              <Paper className={classes.paper2}>
                these are the Apis
              </Paper>
            ) : null}


            <Button className={classes.btn} variant="outlined" onClick={(e) => this.handleClick('openMeal')}>MEALS</Button>
            {openMeal ? (
              <Paper className={classes.paper3}>
              These are meal types
              </Paper>
            ) : null}

        </ClickAwayListener>
      </div>
    );
  }
}

ClickAway.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClickAway);
