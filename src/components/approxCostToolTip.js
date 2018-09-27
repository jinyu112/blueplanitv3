import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import CONSTANTS from '../constants.js';
import TooltipMat from '@material-ui/core/Tooltip';

// This component shows a tool tip if the price of the event is unknown or inaccurate
export class ApproxCostToolTip extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = {
            start: {
                justifyContent: 'start',
            }
        }

        var origin = this.props.origin;

        var toolTipStr = "";
        if (origin) {
            if (origin.localeCompare(CONSTANTS.ORIGINS_YELP) === 0) {
                toolTipStr = CONSTANTS.APPROX_YELPRESTAURANT_COST_STR;
            }
            else {
                toolTipStr = CONSTANTS.APPROX_EVENT_COST_STR;
            }
        }
        else {
            toolTipStr ="";
        }

        var approxCostFlag = this.props.approxCostFlag;
        var indicateApproxCost;
        if (approxCostFlag) {
            indicateApproxCost = (
                <TooltipMat placement="top" title={toolTipStr}><span>*</span></TooltipMat>
            );
        }
        return (
            <span className="justify">{indicateApproxCost}</span>
        )
    }
}

export default ApproxCostToolTip;
