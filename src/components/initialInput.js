import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker';
import genAlgo from '../GA.js'
import idb_keyval from 'idb-keyval'
import Loader from './reactloading.js';
import MapBoxComponent from './mapBoxComponent';
import misc from '../miscfuncs/misc.js'
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../maps.css';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import TooltipMat from '@material-ui/core/Tooltip';
import CONSTANTS from '../constants.js';
import Icon from "@material-ui/core/Icon/Icon";
import LocationErrorDialog from './locationErrorDialog.js'
import Itinerary from './itinerary';

const geocoder = require('geocoder');
class InitialInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            data_latlon: {}, // data from geocode
            startDate: '',
            budgetmax: CONSTANTS.MAX_BUDGET_DEFAULT,
            searchRadius: CONSTANTS.DEFAULT_SEARCH_RADIUS_MI,
            eventType: 0,
            numDays: 5,
            redirectFlag: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        //global variables
        this.locationCheckResult = 0; // only set by misc.checkIfValidLocation function,
        // 0 = valid location, 1 = invalid location (outside of supported countries), 2 = invalid location input
    }

    handleSubmit(e) {
        try {
            e.preventDefault();
        }
        catch (err) {
            //do nothing
        }
        console.clear();

        this.locationCheckResult = -1;
        if (this.state.startDate) {
            // Convert the moment obj from the user input into a date object in javascript
            var date = this.state.startDate.toDate(); // This does not change if the date selected in the UI does change

            if (misc.isDate(date)) {
                // Geocoding to convert user location input into lat/lon
                geocoder.geocode(this.state.location, function (err, data_latlon) {
                    var validLocationObj = misc.checkIfValidLocation(data_latlon);
                    this.locationCheckResult = validLocationObj.returnOption;
                    if (validLocationObj.validFlag) {
                        this.setState({
                            redirectFlag: true,
                            data_latlon: data_latlon,
                        })
                    }
                    else {
                        this.setState({
                            redirectFlag: false,
                            data_latlon: data_latlon,
                        })
                    }
                }.bind(this), { key: process.env.REACT_APP_GOOGLE_API_KEY })
            }
        }
    }

    handleStateChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleDateChange(e) {
        this.setState({
            startDate: e
        });
    }

    render() {
        // if passed all checks, then render component
        if (this.state.redirectFlag) {
            return (
                <Itinerary inputs={this.state}/>
            )
        }

        // Handle empty budget input
        if (!this.state.budgetmax || isNaN(this.state.budgetmax) || this.state.budgetmax === undefined) {
            this.setState({
                budgetmax: CONSTANTS.MAX_BUDGET_DEFAULT,
            })
        }

        // valid/invalid location input error message
        var locationErrorMessage = null;
        if (this.locationCheckResult === 1) {
            locationErrorMessage = <LocationErrorDialog title={CONSTANTS.LOCATION_INPUT_ERROR_OUTSIDE_TITLE}
                desc={CONSTANTS.LOCATION_INPUT_ERROR_OUTSIDE_DESC}
                open={true} />;
        }
        else if (this.locationCheckResult === 2) {
            locationErrorMessage = <LocationErrorDialog title={CONSTANTS.LOCATION_INPUT_ERROR_INVALID_TITLE}
                desc={CONSTANTS.LOCATION_INPUT_ERROR_INVALID_DESC}
                open={true} />;
        }

        return (
            <AppBar position="static">
                {locationErrorMessage}
                <div className="topNavBar">
                    <span className="nav-bar-logo">Blue</span>
                    <span className="nav-bar-logo2">Planit</span>
                </div>

                <Toolbar className="toolbar">
                    <form className="homepageForm" autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="formCopy">
                            <h3>Let us plan<br /> so you don't have to.</h3>
                        </div>
                        <div className="inputsRow">

                            {/* location input */}
                            <div className="inputContainers">
                                <div>
                                    <label className="inputLabel" for="location">WHERE</label>
                                    <div className="homepageIcon">
                                        <Icon>search</Icon>
                                    </div>
                                    <TooltipMat placement="bottom" title={CONSTANTS.LOCATION_TOOLTIP_STR}>
                                        <input required id="location" className="fixedTextInput homepageInputs" type="text" name="location" onChange={this.handleStateChange} autoComplete="address-level2" />
                                    </TooltipMat>
                                </div>
                            </div>

                            {/* date input */}
                            <div className="inputContainers">
                                <label className="inputLabel" htmlFor="datePicker">WHEN</label>
                                <div className="form-group mb-2 datePickerWrapper">
                                    <DatePicker required id="datePicker" placeholderText="mm/dd/yyyy" className="textInput fixedTextInput homepageInputs textInputLeft" selected={this.state.startDate} onChange={this.handleDateChange} minDate={CONSTANTS.TODAYDATE} />
                                </div>
                            </div>

                            {/* budget input */}
                            <div className="inputContainers">
                                <div className="form-group mb-2">
                                    <label className="inputLabel" htmlFor="budgetmax">TRIP BUDGET</label>
                                    <div className="homepageIcon">
                                        <Icon>credit_card</Icon>
                                    </div>
                                    <TooltipMat placement="bottom" title={CONSTANTS.MAX_TOOLTIP_STR}>
                                        <input /*required*/ className="fixedTextInput homepageInputs" min="0" type="number" name="budgetmax" placeholder="$1000" /*value={this.state.budgetmax}*/ onChange={this.handleStateChange} />
                                    </TooltipMat>
                                </div>
                            </div>

                            {/* Search button */}
                            <div className="search-btn">
                                <TooltipMat placement="bottom" title={CONSTANTS.GO_TOOLTIP_STR}>
                                    <Button variant="contained" color="secondary" type="submit" onSubmit={this.handleSubmit}>
                                        {CONSTANTS.SEARCH_BUTTON_STR}
                                    </Button>
                                </TooltipMat>
                            </div>
                        </div>
                    </form>
                </Toolbar>
            </AppBar>
        )
    }
}

export default InitialInput;
