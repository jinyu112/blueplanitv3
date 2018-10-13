import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types'
import CONSTANTS from '../constants.js'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import misc from '../miscfuncs/misc.js';

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
        this.handleBlur = this.handleBlur.bind(this);

    }

    handleBlur(event) {
        var userFoodCost = misc.round2NearestHundredth(parseFloat(this.refs.foodCost.value));
        this.props.updateUserFoodCost(userFoodCost)
    }

    render() {


        return (
            <div>
                <div>
                    <input type="number" className="text-success form-control moreOptionFoodCost" min="0"
                        defaultValue={0} onBlur={this.handleBlur}
                        ref="foodCost" />
                </div>
                <div>
                    <input type="number" className="text-success form-control moreOptionEventCost" min="0"
                        defaultValue={20} onBlur={this.handleBlur}
                        ref="eventCost" />
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


            </div>

        );
    }
}

export default MoreOptions;
