import React, { Component } from 'react'
import renderHTML from 'react-render-html';
import CONSTANTS from '../constants.js'
class MoreInfoView extends Component {
    constructor(props) {
        super(props);

    }

    renderCTAElement() {
        if (this.props.origin === CONSTANTS.ORIGINS_YELP) {
            return <tr><td><a href={this.props.url} target="_blank">{CONSTANTS.YELP_LINK_TEXT}</a></td></tr>;
        }
        else if (this.props.origin === CONSTANTS.ORIGINS_EB) {
            return <tr><td><a href={this.props.url} target="_blank">{CONSTANTS.EB_LINK_TEXT}</a></td></tr>;
        }
        else if (this.props.origin === CONSTANTS.ORIGINS_MU) {
            return <tr><td><a href={this.props.url} target="_blank">{CONSTANTS.MU_LINK_TEXT}</a></td></tr>;
        }
        else if (this.props.origin === CONSTANTS.ORIGINS_GP) {
            return <tr><td><a href={this.props.url} target="_blank">{CONSTANTS.GP_LINK_TEXT}</a></td></tr>;
        }
        else if (this.props.origin === CONSTANTS.ORIGINS_SG) {
            return <tr><td>
                <a href={this.props.url} target="_blank">{CONSTANTS.SG_LINK_TEXT}</a>
                <p>Lowest Priced Ticket: <b>${this.props.otherInfo[1]}</b></p>
                <p>Highest Priced Ticket: <b>${this.props.otherInfo[2]}</b></p>
                </td></tr>;
        }
        else if (this.props.origin === CONSTANTS.ORIGINS_NONE) {
            return;
        }
        return;
    }

    renderDescElement() {
        var desc = this.props.desc;
        if (desc === undefined) {
            desc = "";
        }
        if (this.props.origin === CONSTANTS.ORIGINS_YELP) {
            return (
                <td>
                    <p><b>Description: </b></p>
                    {renderHTML(desc)}
                    <a href={this.props.thumbnail} target="_blank">
                        <img className="moreInfoThumbnail" src={this.props.thumbnail} />
                    </a>
                </td>
            );
        }
        else if (this.props.origin !== CONSTANTS.ORIGINS_MU) {
            return (
                <td>
                    <p><b>Description: </b></p>                    
                    <a href={this.props.thumbnail} target="_blank">
                        <img className="moreInfoThumbnail" src={this.props.thumbnail} />
                    </a>
                    {renderHTML(desc)}
                </td>
            );
        }
        else { // if it is from meetup, don't show the img thumbnail since it will likely show up in desc
            return (
                <td>
                    <p><b>Description: </b></p>
                    {renderHTML(desc)}
                </td>
            );    
        }

    }

    render() {
        var eventDuration = this.props.duration;
        if (eventDuration === undefined) {
            eventDuration = "";
        }
        else {
            eventDuration += CONSTANTS.HOURS_TEXT;
        }
        
        if (this.props.origin !== CONSTANTS.ORIGINS_NONE || this.props.origin !== CONSTANTS.ORIGINS_USER) {
            if (this.props.duration > 24) {
                eventDuration = CONSTANTS.MULTI_DAY_EVENT_MSG;
            }
            if (this.props.defaultDurationFlag) {
                eventDuration = CONSTANTS.APPROX_DURATION_MSG;
            }
        }
        else {
            eventDuration = "";
        }

        return (
            <table className="moreInfoTable">
                <tbody>
                {this.renderCTAElement()}
                <tr>
                  <td><b>Phone Number: </b>{this.props.phone}</td>
              </tr>
              <tr>
                  <td><b>Address: </b>{this.props.address}</td>
              </tr>
              <tr>
                  <td><b>Duration: </b>{eventDuration}</td>
              </tr>
              <tr>
                  {this.renderDescElement()}
              </tr>
              </tbody>
          </table>
      );
    }
  }

  export default MoreInfoView;
