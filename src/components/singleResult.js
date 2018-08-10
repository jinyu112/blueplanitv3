import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import CONSTANTS from '../constants.js';
import misc from '../miscfuncs/misc.js';
import placeholder from '../images/placeholder.png';

// This component constructs a single result that is displayed to the user from the api data
export class SingleResult extends Component {
    constructor(props) {
        super(props);
    }

    //
    handleAddEvent = (e) => {
        if (e.target.checked) {
            var tempObj = this.props.itinObj;
            tempObj["other"]=this.props.eventKey;
            this.props.AddEvent(tempObj);
        }
    }

    truncateText = (string) => {
        if (string.length > 50) {
            string = string.substring(0, string.length - (string.length - 60));
            string = string + ' ...';
            return string;
        } else {
            return string;
        }
    }

    render() {
        var titleStr = this.truncateText(this.props.itinObj.name);
        var urlStr = this.props.itinObj.url;
        var imgUrlStr = this.props.itinObj.thumbnail ? this.props.itinObj.thumbnail : placeholder;
        var timeStr = misc.convertMilTime(this.props.itinObj.time);
        var costStr = this.props.itinObj.cost;
        return (
            <div>
                <table className="singleApiResult">
                    <tbody>
                    <tr>
                        <td colSpan="3">
                            <a href={urlStr} target='_blank'><img className="singleResultImg" src={imgUrlStr} /></a>
                        </td>
                    </tr>
                    </tbody>

                    <tbody>
                    <tr>
                        <td colSpan="3">
                        <a href={urlStr} target='_blank'>{titleStr}</a></td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td><input key={titleStr} type="checkbox" onChange={this.handleAddEvent}/></td>
                        <td>{timeStr}</td>
                        <td>${costStr}</td>

                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SingleResult;
