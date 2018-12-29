import React, { Component } from 'react'
import misc from '../miscfuncs/misc.js';
import CONSTANTS from '../constants.js';
import TooltipMat from '@material-ui/core/Tooltip';

export class EditCostComponent extends Component {
    constructor(props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(event) {
        var edittedEventCost = misc.round2NearestHundredth(parseFloat(this.refs.edittedEventCost.value.replace('$','')));
        var edittedEventName = this.props.name;
        var i_resultsArray = this.props.i_resultsArray; // index of the event in the itinerary results (0-6, ie the itinerary slot)
        var edittedEventOrigin = this.props.origin;
        var i_originalItinPos = this.props.i_originalItinPos;

        if (edittedEventCost !== this.props.cost) {
            this.props.handleCostChange(edittedEventCost,edittedEventName,i_resultsArray,edittedEventOrigin,i_originalItinPos)
        }
    }

    render() {
        var cost = misc.round2NearestHundredth(parseFloat(this.props.cost));
        var editCostComponentArray = [];
        var eventOrigin = this.props.origin;
        if (!eventOrigin || eventOrigin === null || eventOrigin === undefined) {
            eventOrigin = CONSTANTS.ORIGINS_NONE;
        }
        if (eventOrigin.localeCompare(CONSTANTS.ORIGINS_NONE) !== 0) { //if not a "none item" itinerary slot, show the price
            // editCostComponentArray.push(<span key={this.props.name + "editCostSpan"}>$</span>);
            editCostComponentArray.push(<input type="text" className="text-succes form-control editCostStyle" min="0"
                defaultValue={'$ ' + cost} onBlur={this.handleBlur}
                ref="edittedEventCost"
                key={this.props.name + "editCostInput"}/>);
        }

        return (
            <form>
                <TooltipMat placement="top" title={CONSTANTS.EDITCOST_TOOLTIP_STR}>
                    <div key={this.props.name + "editCostDiv"}>
                        {editCostComponentArray}
                    </div>
                </TooltipMat>
            </form>
        );
    }
}

export default EditCostComponent;
