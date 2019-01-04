import React, { Component } from 'react'
import misc from '../miscfuncs/misc.js';
import CONSTANTS from '../constants.js';
import TooltipMat from '@material-ui/core/Tooltip';

export class EditCostComponent extends Component {
    constructor(props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(e) {
        e.preventDefault(); //prevents form submission when "enter" is pressed, this fixes the page refresh issue when the "enter" button is pressed
    }

    handleKeyUp(event) {
        if (event.keyCode || event.which) {
            if (event.keyCode === 13 || event.which === 13) { // the "enter" button           
                this.handleBlur(event);
                return false;
            }
        }
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
            editCostComponentArray.push(<form onSubmit={this.submitHandler}><input type="text" className="text-succes form-control editCostStyle" min="0"
                defaultValue={'$ ' + cost} onBlur={this.handleBlur} onKeyUp={this.handleKeyUp}
                ref="edittedEventCost"
                key={this.props.name + "editCostInput"}/></form>);
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
