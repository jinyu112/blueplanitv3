import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import CONSTANTS from '../constants.js';
import misc from '../miscfuncs/misc.js';

// This component handles showing the user an informative message near the total cost display.
// Issumes that the incoming messageObj prop has the following structure:
//messagObj ={
//  textArray: [string1, string2, ... ,stringn],
//  boldIndex: indexForStringToBeBolded,  
//}
export class Message extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var outputMessageArray = [];
        var messageObject = this.props.messageObj;
        for (var i = 0; i < messageObject.textArray.length; i++) {
            if (i !== messageObject.boldIndex) {
                outputMessageArray.push(messageObject.textArray[i]);
            }
            else {
                outputMessageArray.push(<b key={i}>{messageObject.textArray[i]}</b>); // bold the array element
            }
        }

        return (
            <div className="message">
            <i className="text-warning fas fa-exclamation-triangle"></i> {outputMessageArray}
            </div>
        )
    }
}

export default Message;
