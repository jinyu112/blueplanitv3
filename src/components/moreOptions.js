import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types'
import CONSTANTS from '../constants.js'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import misc from '../miscfuncs/misc.js';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 450,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});


class MoreOptions extends Component {
    constructor(props) {
        super(props);
        this.handleApply = this.handleApply.bind(this);
    }

    state = {
        foodCost: this.props.currentFoodCost,
        eventCost: this.props.currentEventCost,
    }

    handleApply(event) {
        var userFoodCost = misc.round2NearestHundredth(parseFloat(this.state.foodCost));
        this.props.updateUserFoodCost(userFoodCost);
        var userEventCost = misc.round2NearestHundredth(parseFloat(this.state.eventCost));
        this.props.updateUserEventCost(userEventCost);
    }

    handleFoodChange = (event, value) => {
        this.setState({ foodCost: value });
    };
    handleEventChange = (event, value) => {
        this.setState({ eventCost: value });
    };

    render() {


        return (
            <div>
                <div>
                    <Paper >
                        <Typography id="label">{CONSTANTS.MOREOPT_FOODSTRING}</Typography>
                        <Slider value={this.state.foodCost} min={0} max={CONSTANTS.MOREOPT_MAXFOODPRICE}
                            step={CONSTANTS.MOREOPT_FOODPRICESTEP}
                            onChange={this.handleFoodChange} />
                        ${this.state.foodCost}

                    </Paper>
                </div>
                <div>
                    <Paper >
                        <Typography id="label">{CONSTANTS.MOREOPT_EVENTSTRING}</Typography>
                        <Slider value={this.state.eventCost} min={0} max={CONSTANTS.MOREOPT_MAXEVENTPRICE}
                            step={CONSTANTS.MOREOPT_EVENTPRICESTEP}
                            onChange={this.handleEventChange} />
                        ${this.state.eventCost}

                    </Paper>

                </div>
                <div>
                    <FormControl>
                        <InputLabel>Breakfast</InputLabel>
                        <Select>
                            <option value="" />
                            <option value={1}>Breakfast</option>
                            <option value={2}>Asian</option>
                            <option value={3}>Greek</option>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <InputLabel>Lunch</InputLabel>
                        <Select>
                            <option value="" />
                            <option value={1}>Lunch</option>
                            <option value={2}>Asian</option>
                            <option value={3}>Greek</option>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <InputLabel>Dinner</InputLabel>
                        <Select>
                            <option value="" />
                            <option value={1}>Dinner</option>
                            <option value={2}>Asian</option>
                            <option value={3}>Greek</option>
                        </Select>
                    </FormControl></div>

                <Button href="#text-buttons" onClick={this.handleApply}>
                    Apply
            </Button>
            </div>

        );
    }
}

export default MoreOptions;
