import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
    }

    state = {
        value: this.props.maxDistance,
        prevRadius: this.props.maxDistance,
        maxDistanceValue: this.props.maxDistance,
        prevMaxDistanceValue: -1.0,
        doApiCallState: true,
        prevDoApiCallState: true,
    };

    handleChange = (event, value) => {
        this.setState({ value });

        //change result display here
    };

    handleApply = (props) => {
        this.props.setDistance(this.state.value);
        this.setState({
            openRadius: false,
            prevRadius: this.state.value,
        })
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        this.state.maxDistanceValue = this.props.maxDistance;

        if (this.props.apiCalls) {
            this.props.handleResetFilter();
        }

        if (this.state.prevMaxDistanceValue !== this.state.maxDistanceValue ||
            this.props.apiCalls) {
            this.state.value = this.state.maxDistanceValue;
            this.state.prevMaxDistanceValue = this.state.maxDistanceValue;                     
        }

        return (
            <div>
                <Typography id="label">{CONSTANTS.RADIUS_FILTER_STR}</Typography>
                <Slider value={value} min={0} max={this.props.maxDistance} step={1} onChange={this.handleChange} ref={distanceSlider => this.distanceSlider = distanceSlider} />
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
