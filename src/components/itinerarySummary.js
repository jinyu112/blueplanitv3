import React, { Component } from 'react'
import CONSTANTS from '../constants.js'
import Button from '@material-ui/core/Button';
import TooltipMat from '@material-ui/core/Tooltip';
import Message from './message.js';
import EmailModal from './emailModal.js';
import misc from '../miscfuncs/misc.js'
import Icon from "@material-ui/core/Icon/Icon";

class ItinerarySummary extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    handleSubmit() {
        this.props.handleSubmit();
    }

    openModal() {
        this.emailModal.openModal();
    }    


    render() {
        var totalCostDisplayed = this.props.totalCostDisplayed;
        var message = this.props.message;
        var messageObject = this.props.messageObject;
        var location = this.props. location;
        var totalCost = this.props.totalCost;
        var resultsArray = this.props.resultsArray;
        var emailModal = this.props.emailModal;

        return (
            <div>
                <div className="totalCost">
                    <div key="totalCostDiv">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="costStr">
                                        <strong>Approx. Total Cost:</strong>
                                    </td>
                                    <td className="cost">
                                        {totalCostDisplayed}
                                    </td>
                                </tr>


                                {message === -1 ? '' :
                                    <tr><td colSpan="2">
                                        <Message key={"messageComponent"} messageObj={messageObject} />
                                    </td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <table key={"go-button-table"}>
                        <tbody>
                            <tr>
                                <td className="sendEmail">
                                    <EmailModal location={location} totalCost={totalCost} resultsArray={resultsArray} onRef={ref => (this.emailModal = ref)} />
                                    <TooltipMat placement="top" title={CONSTANTS.EMAIL_TOOLTIP_STR}>
                                        <input className="block btn btn-sm btn-primary go-btn" type="button" value="Send Me the Itinerary" onClick={this.openModal} />
                                    </TooltipMat>
                                </td>
                                <td className="itinGoBtn">
                                    <TooltipMat placement="top" title={CONSTANTS.SEARCHAGAIN_TOOLTIP_STR}>
                                        <input className="btn btn-sm go-btn" type="submit" onClick={this.handleSubmit} value="Search Again!" />
                                    </TooltipMat>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ItinerarySummary;




