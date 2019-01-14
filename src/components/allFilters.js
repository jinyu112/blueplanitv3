import PriceFilter from "./priceFilter";
import DistanceFilter from "./distanceFilter";
import ApiFilter from "./apiFilter";
import CONSTANTS from "../constants";
import TimeFilter from "./timeFilter";
import MealFilter from "./mealFilter";
import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// this component serves as the dialog box that pops up when the location the user input is not valid.

class AllFilters extends React.Component {
    handleClose = () => {
        this.props.closeFilters(false);
    };

    render() {

        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="filters-modal"
                >
                    <DialogTitle>Filters</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div className="filters-div">
                                <PriceFilter setPriceRange={this.props.handlePriceFilter}></PriceFilter>
                                <DistanceFilter maxDistance={this.props.searchRadiusForFilterCompare}
                                                setDistance={this.props.setDistance}></DistanceFilter>
                                <ApiFilter setApiFilterFlags={this.props.handleApiFilter}></ApiFilter>
                                {this.props.tabState == CONSTANTS.NAV_EVENT_TAB_ID ?
                                    <TimeFilter setTimeRange={this.props.handleTimeFilter}></TimeFilter> :
                                    <MealFilter setMealFilterFlags={this.props.handleMealFilter}></MealFilter>
                                }
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AllFilters;
