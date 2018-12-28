import React, { Component } from 'react'
import CONSTANTS from '../constants.js'
import Button from '@material-ui/core/Button';
import TooltipMat from '@material-ui/core/Tooltip';
import EditCostComponent from './editCostComponent.js';
import misc from '../miscfuncs/misc.js'
import Icon from "@material-ui/core/Icon/Icon";

import { isNullOrUndefined } from 'util';

class ItineraryCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // turn images on/off
        var showImages = true;


        var key=this.props.key;
        var i = this.props.cardIndex;
        var id = this.props.itineraryCardId;
        var lock_icon = this.props.lockIcon;
        var elim_icon = this.props.elimIcon;
        var checkedState = this.props.itinCardCheckedState; //this.state.checked[i]
        var elimState = this.props.itinCardElimState; //this.state.eliminated[i]
        var elim_id = this.props.elimId;
        var elimToolTipStr = this.props.elimToolTipStr;
        var dataNumAttribute = this.props.dataNumAttribute;
        var truncate_name = this.props.truncate_name;
        var url = this.props.url; //this.state.resultsArray[i].url
        var name = this.props.name;
        var itinTime = this.props.itinTime; //this.state.itinTimes[i]
        var num_words_desc = this.props.num_words_desc;
        var description = this.props.description;
        description = misc.capFirstLetter(description);
        var origin = this.props.origin; // this.state.resultsArray[i].origin
        var isShortDescHTML = this.props.isShortDescHTML;
        var shortenedDesc = this.props.shortenedDesc; 
        shortenedDesc = misc.capFirstLetter(shortenedDesc);
        var descDialog = this.props.descDialog;
        var cost = this.props.cost; //this.state.resultsArray[i].cost
        var origins = this.props.origins;
        var resultsArray = this.props.resultsArray;

        // Construct the distance from previous location string and time to next distance string for display
        var distances = this.props.distances.slice();
        var distanceFromLast = distances[i];
        if (distanceFromLast !== -1.0) {      
            distanceFromLast = misc.round2NearestTenth(distances[i]);
        }

        var distanceValueStr = distanceFromLast + CONSTANTS.DISTANCE_UNIT_STR;
        var distanceFromLastStr = CONSTANTS.DISTANCE_FROM_PREV_LOC_STR;
        var prevItinItemName = '';
        var timeDifference = 0.0;
        var timeDifferenceStr = '';
        var startStr = ' starts.'
        var fromStr = ' from '

        var nextValidLocation = -999;
        var nextItinItemName = '';

        // find next location with time data
        if (resultsArray[i].origin.localeCompare(CONSTANTS.ORIGINS_YELP) !== 0 &&
            resultsArray[i].origin.localeCompare(CONSTANTS.ORIGINS_NONE) !== 0) {
            for (var ii = i + 1; ii < distances.length; ii++) {
                if (resultsArray[ii].origin.localeCompare(CONSTANTS.ORIGINS_YELP) !== 0 &&
                    resultsArray[ii].origin.localeCompare(CONSTANTS.ORIGINS_NONE) !== 0) {
                    nextValidLocation = ii;
                    break;
                }
            }
        }

        if (nextValidLocation !== -999) {
            if (i !== distances.length) {
                timeDifference = misc.getTimeDifference(resultsArray[i].time,resultsArray[nextValidLocation].time)                
                timeDifferenceStr = misc.msToTime(timeDifference);
                nextItinItemName = resultsArray[nextValidLocation].name;
                var num_words_name = nextItinItemName.split(/\W+/).length;
                if (num_words_name > 3) {
                    nextItinItemName = resultsArray[nextValidLocation].name.split(/\W+/).slice(0, 4).join(" ");
                    nextItinItemName = nextItinItemName + '...';
                }
                timeDifferenceStr = timeDifferenceStr + " until ";
            }
        }
        else {
            timeDifference = 0.0;
            timeDifferenceStr = '';
            startStr = '';
        }

        if (i === this.props.iFirstValidLocation) {
            distanceFromLastStr = CONSTANTS.DISTANCE_FROM_INPUT_STR;
            fromStr = '';
        }
        else {
            var lastValidLocation = -999;
            
            // find last location with accurate location data
            for (var ii = i - 1; ii >= 0; ii--) {
                if (distances[ii] !== -1.0) {
                    lastValidLocation = ii;
                    break;
                }
            }

            if (lastValidLocation !== -999) {
                prevItinItemName = resultsArray[lastValidLocation].name;
                var num_words_name = prevItinItemName.split(/\W+/).length;
                if (num_words_name > 3) {
                    prevItinItemName = resultsArray[lastValidLocation].name.split(/\W+/).slice(0, 4).join(" ");
                    prevItinItemName = prevItinItemName + '...';
                }
            }

            // This is here because eventbrite events dont have an accurate location
            if (lastValidLocation !== -999) {
                distanceFromLastStr = CONSTANTS.DISTANCE_FROM_ITH_LOC_STR + " ";                                
            }
        }

        if (distanceFromLast !== 1.0) {
            if (i === this.props.iFirstValidLocation) {
                distanceValueStr = distanceValueStr + "s ";
            }
            else {
                distanceValueStr = distanceValueStr +"s";
            }
        }

        if (distanceFromLast === -1.0) {
            distanceFromLastStr = CONSTANTS.NO_LOCATION_DATA;
            if (origin.localeCompare(CONSTANTS.ORIGINS_NONE) === 0) {
                distanceFromLastStr = '';
            }
            distanceValueStr = '';
            prevItinItemName = '';
            fromStr = '';
        }

        var editCostHelperText = "";
        if (resultsArray[i].time.localeCompare(CONSTANTS.FOODTIME_STR) === 0) {
            editCostHelperText = CONSTANTS.ITIN_FOOD_HELPER_TEXT;
        }
        else {
            if (resultsArray[i].origin.localeCompare(CONSTANTS.ORIGINS_NONE) === 0) {
                editCostHelperText = "";
            }
            else {
                editCostHelperText = CONSTANTS.ITIN_EDIT_COST_HELPER_TEXT ;
            }
        }
        
        var itineraryLeftLineText = resultsArray[i].time;
        if (itineraryLeftLineText.localeCompare(CONSTANTS.FOODTIME_STR) === 0) {
                itineraryLeftLineText = CONSTANTS.FOODTIME_STR;
        }
        else {
            itineraryLeftLineText = misc.convertMilTime(itineraryLeftLineText);
        }

        // thumbnail 
        var thumbnailUrl = resultsArray[i].thumbnail;
        if (!thumbnailUrl || thumbnailUrl === undefined || thumbnailUrl === null) {
            thumbnailUrl = "";
        }
        
        return (
            <div>
            <div ref={ (divElement) => this.divElement = divElement} className="itinCardContainerDiv">
                <div className="itineraryLeftLine"></div>                
                <div className="itinTimeInfoLeftLine">
                {<span className="boldIt"><b>{itineraryLeftLineText}</b></span>}
                </div>
                <div className="showActions" key={key} id={"itinCard" + i}>                
                    <div className="actions">

                        <div className="actionButtonDiv">
                            <Button className="lock-button" >
                                <label className="takeSpace" htmlFor={"down_button" + id}>
                                    <TooltipMat placement="top" title={"Move down"}>
                                        {<Icon>keyboard_arrow_down</Icon>}
                                    </TooltipMat>
                                </label>
                                <input className="down_button" id={"down_button" + id} onClick={this.props.handleMoveItemDown} type="button" value={i} />
                            </Button>
                        </div>

                        <div className="actionButtonDiv">
                            <Button className="lock-button" >
                                <label className="takeSpace" htmlFor={"up_button" + id}>
                                    <TooltipMat placement="top" title={"Move up"}>
                                        {<Icon>keyboard_arrow_up</Icon>}
                                    </TooltipMat>
                                </label>
                                <input className="up_button" id={"up_button" + id} onClick={this.props.handleMoveItemUp} type="button" value={i} />
                            </Button>
                        </div>

                        <div className="actionButtonDiv">
                            <Button className="lock-button" >
                                <label className="takeSpace" htmlFor={id}>
                                    <TooltipMat placement="top" title={CONSTANTS.LOCK_TOOLTIP_STR}>
                                        {lock_icon}
                                    </TooltipMat>
                                </label>
                                <input className="lock_checkbox" id={id} checked={checkedState} onChange={this.props.handleCheckbox} type="checkbox" value={i} /> {/* this.handleCheckbox*/}
                            </Button>
                        </div>

                        <div className="actionButtonDiv">
                            <Button className="elim-button" variant="contained" color="secondary">
                                <label className="takeSpace" htmlFor={elim_id}>
                                    <TooltipMat placement="top" title={elimToolTipStr}>
                                        {elim_icon}
                                    </TooltipMat>
                                </label>
                                <input className="elim_checkbox" id={elim_id} checked={elimState} onChange={this.props.handleEliminate} type='checkbox' value={i} /> {/* this.handleEliminate*/}
                            </Button>
                        </div>
                    </div>
                    {thumbnailUrl.localeCompare("") === 0 && showImages ? "" : <div className="resultsImgContainer"><a href={thumbnailUrl} target='_blank'><img src={thumbnailUrl}/></a></div>}

                    <div className="itinRowContent" data-number={dataNumAttribute}>

                        <div className="resultsName icon-name itinEventCol3">

                            <div>
                                <span className="align">
                                    {url === "" ? <strong>{truncate_name ? truncate_name : name}</strong> :
                                        <strong><a href={url} target='_blank'>{truncate_name ? truncate_name : name}</a></strong>}
                                </span>
                                <div>
                                    <span>

                                        {itinTime == 'Food' ?
                                            <div className="displayInline">
                                                <i className="fas fa-utensils"></i>
                                            </div>
                                            : ''
                                        }

                                        {
                                            num_words_desc > 10 ? '' : (description === 0 || !description) ? '' : ' ' + description
                                        }
                                        {
                                            <div className="itinShortDesc">
                                                {
                                                    ((origin.localeCompare(CONSTANTS.ORIGINS_EB) === 0 ||
                                                        origin.localeCompare(CONSTANTS.ORIGINS_MU) === 0) && !isShortDescHTML) ? shortenedDesc : ''
                                                }

                                            </div>
                                        }

                    <div>
                        </div>

                                        {
                                            num_words_desc > 10 ?
                                                <div>
                                                    <Button id={'open-' + i} className="descBtn" variant="contained" color="primary" onClick={this.props.handleClickDescOpen}> {/*this.handleClickDescOpen */}
                                                        <span id={'open-span-' + i}>Read More</span>
                                                    </Button>
                                                </div> : ''
                                        }
                                    </span>
                                    {descDialog}
                                </div>
                            </div>



                        </div>

                        <div className="itinEventCol4 edit-cost text-warning">
                            <div className="costPanel">

                                <div className="edit-cost-cont">
                                    <EditCostComponent
                                        name={name}
                                        cost={cost}
                                        handleCostChange={this.props.handleEventCostChange} //this.handleEventCostChange
                                        i_resultsArray={i}
                                        origin={origin}
                                    />
                                </div>
                                <div className="EditCostHelperText">
                                    {editCostHelperText}
                                </div>

                            </div>
                        </div>


                    </div>
                    <div className="itineraryCardBottomDiv">
                    <div className="distanceFromLastDiv">{distanceFromLastStr}&nbsp;<b>{distanceValueStr}</b>&nbsp;{fromStr}&nbsp;<a href={url}>{" " + prevItinItemName + " "}</a>&nbsp;</div>
                    <div className="justify-end">
                        <a href={url} >
                            <img className="origin-logo" alt="" src={origins[origin]} />
                        </a>
                    </div>
                    </div>
                </div>
                
            </div>
            <div className="timeDifferenceDiv">{timeDifferenceStr}<b>{nextItinItemName}</b>&nbsp;{startStr}</div>
            </div>
        );
    }
}

export default ItineraryCard;




