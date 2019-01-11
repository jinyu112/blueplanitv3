import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
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
    }

    state = {
        value: this.props.maxDistance,
        prevRadius: this.props.maxDistance,
        maxDistanceValue: this.props.maxDistance,
        prevMaxDistanceValue: -1.0,
        doApiCallState: true,
        prevDoApiCallState: true,
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

    // handleClick = (filter_state) => {
    //     var objectState = {};
    //     var currentState = this.state[filter_state];
    //     objectState[filter_state] = !currentState;
    //     this.setState(objectState);
    // };
    //
    // handleClickAway = (props) => {
    //     this.setState({
    //         openRadius: false,
    //         value: this.state.prevRadius,
    //     });
    // };

    handleChange = (event) => {
        this.setState({ value: event.target.value },console.log(this.state));

        //change result display here
    };

    handleApply = (props) => {
        console.log('setting', this.state.value);
        this.props.setDistance(this.state.value);
        this.setState({
            prevRadius: this.state.value,
        })
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        this.state.maxDistanceValue = this.props.maxDistance;
        var displayValue = this.state.value;

        if (this.props.apiCalls) {
            this.props.handleResetFilter();
        }

        if (this.state.prevMaxDistanceValue !== this.state.maxDistanceValue ||
            this.props.apiCalls) {
            displayValue = this.state.maxDistanceValue;
            this.state.value = this.state.maxDistanceValue;
            this.state.prevMaxDistanceValue = this.state.maxDistanceValue;                     
        }

        return (
            <div className="filter" ref={this.setWrapperRef}>
                <div className="filter-header">
                    <p>{CONSTANTS.RADIUS_FILTER_STR}</p>
                </div>
                <div className="distance-checkboxes">
                    <input type="checkbox" value="5" onClick={this.handleChange}/> 5
                    <input type="checkbox" value="10" onClick={this.handleChange}/> 10
                    <input type="checkbox" value="15" onClick={this.handleChange}/>15
                    <input type="checkbox" value="25" onClick={this.handleChange}/>25
                </div>
                <Button href="#text-buttons" className={classes.button} onClick={this.handleApply}>
                    Apply
                </Button>
            </div>
        );
    }
}

ClickAway.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClickAway);
