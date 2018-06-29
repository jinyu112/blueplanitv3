import React, { Component } from 'react'
import misc from '../miscfuncs/misc.js';

export class EditCostComponent extends Component {
    constructor(props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(event) {
        var edittedEventCost = misc.round2NearestHundredth(parseFloat(this.refs.edittedEventCost.value));
        var edittedEventName = this.props.name;
        var i_resultsArray = this.props.i_resultsArray; // index of the event in the itinerary results (0-6, ie the itinerary slot)
        var edittedEventOrigin = this.props.origin;

        if (edittedEventCost !== this.props.cost) {
            this.props.handleCostChange(edittedEventCost,edittedEventName,i_resultsArray,edittedEventOrigin)
        }
    }

    render() {
        var cost = misc.round2NearestHundredth(parseFloat(this.props.cost));
        return (
            <form>
            <div className="edit-cost-cont" key={this.props.name}>
                <span>$</span>
                <input type="number" className="text-success form-control editCostStyle" min="0"
                    defaultValue={cost} onBlur={this.handleBlur}
                    ref="edittedEventCost"/>
            </div>
            </form>
        );
    }
}

export default EditCostComponent;
