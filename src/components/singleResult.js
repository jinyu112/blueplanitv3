import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import CONSTANTS from '../constants.js';
import misc from '../miscfuncs/misc.js';

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

    render() {

        var titleStr = this.props.itinObj.name;
        var urlStr = this.props.itinObj.url;
        var imgUrlStr = this.props.itinObj.thumbnail;
        var timeStr = misc.convertMilTime(this.props.itinObj.time);
        var costStr = this.props.itinObj.cost;
        return (
            <div>
                <table className="singleApiResult">
                    <tbody>
                    <tr>
                        <td colSpan="3">
                            <a href={urlStr} target='_blank'><img src={imgUrlStr} /></a></td>
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
