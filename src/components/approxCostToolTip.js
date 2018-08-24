import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import CONSTANTS from '../constants.js';
import { Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';

// This component shows a tool tip if the price of the event is unknown or inaccurate
export class ApproxCostToolTip extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var origin = this.props.origin;
        var toolTipStr = "";
        if (origin.localeCompare(CONSTANTS.ORIGINS_YELP) === 0) {
            toolTipStr = CONSTANTS.APPROX_YELPRESTAURANT_COST_STR;
        }
        else {
            toolTipStr = CONSTANTS.APPROX_EVENT_COST_STR;
        }
        const tooltip = (
            <Tooltip id="tooltip">
              <strong>{toolTipStr}</strong>
            </Tooltip>
          );
        var approxCostFlag = this.props.approxCostFlag;
        var indicateApproxCost;
        if (approxCostFlag) {
            indicateApproxCost = (
                <OverlayTrigger placement="top" overlay={tooltip}><span>*</span></OverlayTrigger>
            );
        }
        return (
            <span>{indicateApproxCost}</span>
        )
    }
}

export default ApproxCostToolTip;
