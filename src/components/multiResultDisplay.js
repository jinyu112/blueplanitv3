import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import SingleResult from './singleResult.js';
import CONSTANTS from '../constants.js';
import misc from '../miscfuncs/misc.js';

// this component handles displaying the apidata to the user
export class MultiResultDisplay extends Component {
    constructor(props) {
        super(props);
    }

    handleAddEvent = (e) => {
        this.props.AddUserSelectedEventFromDisplayedResults(e);
    }

    render() {
        var apiData = this.props.apiData;
        // apiData is either (depending on event data input or restaurant data input to this component):
        //   1) apiData=[[Event1:[obj1,...,objn], (event brite)
        //               Event2:[obj1,...,objn],
        //               Event3:[obj1,...,objn],
        //               Event4:[obj1,...,objn]],

        //               [Event1:[obj1,...,objn], (google places )
        //               Event2:[obj1,...,objn],
        //               Event3:[obj1,...,objn],
        //               Event4:[obj1,...,objn]], ....etc
        //                                      ]   
        // OR
        //   2) apiData=[[obj1,...,objn] ,       (yelp restuarant)
        //               [obj1,...,objn] ,
        //               [obj1,...,objn] ]
        var pageNumber = this.props.pageNumber;
        var displayCategory = this.props.displayCategory; // 0 = restaurant data, 1 = event data
        // filters
        var apiSource = this.props.eventFilterFlags;
        var maxTime = this.props.maxTime;
        var minTime = this.props.minTime;
        var maxPrice = this.props.maxPrice;
        var minPrice = this.props.minPrice;
        var filterRadius = this.props.filterRadius;
        var maxRadius = this.props.maxRadius;

        var numArrays = apiData.length;
        var runningEventCnt = 0;
        var prevRunningEventCnt = 0;
        var apiDataShownToUser = [];
        var istart = (pageNumber - 1) * CONSTANTS.NUM_RESULTS_PER_PAGE;
        var iArrayStart = 0;
        var iEventKeyStart = 0;
        var iEventStart = 0;
        var keys;
        var iItinerary = 0;
        if (displayCategory === 1) {
            keys = ['Event1', 'Event2', 'Event3', 'Event4'];
        }
        else {
            keys = ['Restaurants'];
        }

        // handle user added events (doesn't limit the events displayed per page)
        if (displayCategory === 2 && this.props.tabState.localeCompare(CONSTANTS.NAV_USER_TAB_ID) === 0) { 
            var userAddedEvents = apiData;
            
            if (numArrays > 0 && userAddedEvents && userAddedEvents !== undefined) {
                for (var i = 0; i < userAddedEvents.length; i++) {
                    iItinerary = parseInt(userAddedEvents[i].slot) - 1;
                    if (filterForDisplay(userAddedEvents[i],apiSource,
                        maxTime, minTime,
                        maxPrice, minPrice, maxRadius, filterRadius, true)) {
                        apiDataShownToUser.push(<SingleResult key={"userAddedEvents" + i} itinObj={userAddedEvents[i]}
                            AddEvent={this.handleAddEvent} eventKey={iItinerary} />);
                    }
                }
            }
        }
        else { // handle all other event and restaurant data
            // find where to start showing the events based on the pagenumber selected
            if ( (displayCategory === 0 && this.props.tabState.localeCompare(CONSTANTS.NAV_FOOD_TAB_ID) === 0) ||
                 (displayCategory === 1 && this.props.tabState.localeCompare(CONSTANTS.NAV_EVENT_TAB_ID) === 0) ) {
            if (numArrays > 0 && apiData && apiData !== undefined) {
                for (var i = 0; i < numArrays; i++) {
                    for (var ikey = 0; ikey < keys.length; ikey++) {
                        prevRunningEventCnt = runningEventCnt;
                        if (displayCategory === 1) { //events/places
                            runningEventCnt = runningEventCnt + apiData[i][keys[ikey]].length;
                        }
                        else { // yelp restaurants
                            runningEventCnt = runningEventCnt + apiData[i].length;
                        }
                        if (runningEventCnt >= istart) {
                            // save the start indices
                            iArrayStart = i;
                            iEventKeyStart = ikey;
                            iEventStart = istart - prevRunningEventCnt;
                            // Set indices to the max, to break out of for loops                  
                            i = numArrays;
                            ikey = keys.length;
                            break;
                        }
                    }
                }

                // populate apiDataShownToUser with multiple SingleResult components
                runningEventCnt = 0;
                var ievent;
                var tempItineraryObj;

                for (i = iArrayStart; i < numArrays; i++) {
                    for (ikey = iEventKeyStart; ikey < keys.length; ikey++) {
                        var tempObjArray;
                        // because the obj arrays have different structure between events and yelp food places
                        if (displayCategory === 1) {
                            tempObjArray = apiData[i][keys[ikey]]; //events
                        }
                        else {
                            tempObjArray = apiData[i]; //yelp restaurants
                        }
                        if (tempObjArray !== undefined) {
                            for (var ievent = iEventStart; ievent < tempObjArray.length; ievent++) {
                                iItinerary = 0;
                                // populate stuff for SingleResult component
                                if (displayCategory === 1) { //events
                                    tempItineraryObj = tempObjArray[ievent];

                                    // Determining the index in the itinerary for adding to itinerary function
                                    if (keys[ikey].localeCompare(CONSTANTS.EVENTKEYS[0]) === 0) {
                                        iItinerary = 0;
                                    }
                                    else if (keys[ikey].localeCompare(CONSTANTS.EVENTKEYS[2]) === 0) {
                                        iItinerary = 2;
                                    }
                                    else if (keys[ikey].localeCompare(CONSTANTS.EVENTKEYS[4]) === 0) {
                                        iItinerary = 4;
                                    }
                                    else if (keys[ikey].localeCompare(CONSTANTS.EVENTKEYS[6]) === 0) {
                                        iItinerary = 6;
                                    }
                                }
                                else { //yelp restaurants
                                    tempItineraryObj = tempObjArray[ievent];
                                    // Determining the index in the itinerary for adding to itinerary function
                                    if (i === 0) { // breakfast
                                        iItinerary = 1;
                                    }
                                    else if (i === 1) {
                                        iItinerary = 3;
                                    }
                                    else if (i === 2) {
                                        iItinerary = 5;
                                    }
                                }

                                // construct SingleResult component array
                                apiDataShownToUser.push(<SingleResult key={runningEventCnt} itinObj={tempItineraryObj}
                                    AddEvent={this.handleAddEvent} eventKey={iItinerary} />);
                                runningEventCnt = runningEventCnt + 1;

                                if (runningEventCnt >= CONSTANTS.NUM_RESULTS_PER_PAGE) {
                                    i = numArrays;
                                    ikey = keys.length;
                                    break;
                                }
                            }
                            iEventStart = 0; //reset ievent, iterating to start from this first event in the event key
                        }
                    }
                    iEventKeyStart = 0; //reset ievkey, iterating to start from Event1
                }
            } //end if apidata is not empty
        }
        }

        return (
            <div className="ApiDataDisplay">
                {apiDataShownToUser}
            </div>
        )
    }

}

// Returns true if within parameters and api source is selected
function filterForDisplay(itineraryObj, apiSource, maxTime, minTime, maxPrice, minPrice, maxRadius, filterRadius, isUserAddedEventFlag) {
    // apiSource is an array of 1s or 0s and is from userinput state eventFilterFlags 
    // ordered left to right: meetup, eventbrite, seatgeek, google places, select/unselect all options       
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var displayToUserFlag = true;
    var apiSourceLength = apiSource.length;
    var EVENTS_ORIGINS_ARRAY = [
        CONSTANTS.ORIGINS_MU,
        CONSTANTS.ORIGINS_EB,
        CONSTANTS.ORIGINS_SG,
        CONSTANTS.ORIGINS_GP
    ]; // same order as apiSource (order matters)

    if (filterRadius < maxRadius) { // don't show eventbrite events if the distance filter is used because eventbrite doesn't provide lat long for the location
        if (itineraryObj.origin.localeCompare(CONSTANTS.ORIGINS_EB)===0) {
            return false;
        }
    }

    // Check if in distance range
    if (parseFloat(itineraryObj.distance_from_input_location) > filterRadius) {
        return false;
    }

    // Check if in price range
    if (parseFloat(itineraryObj.cost) < minPrice || parseFloat(itineraryObj.cost) > maxPrice) {
        return false;
    }

    // Check if in time range
    if (itineraryObj.origin.localeCompare(CONSTANTS.ORIGINS_YELP) !== 0) {
        if (parseFloat(itineraryObj.time) < minTime || parseFloat(itineraryObj.time) > maxTime) {
            return false;
        }
    }

    // Check if itinerary obj is from a selected api source (ie if meetup is checked, check that this itinerary object is a meetup obj)
    if (!isUserAddedEventFlag || itineraryObj.origin.localeCompare(CONSTANTS.ORIGINS_YELP) !== 0) {
        if (apiSource[apiSourceLength - 1] === 0) { // if not all apiSources are selected
            if (apiSource.reduce(reducer) === 0) { // none of the apiSources are selected
                return false;
            }
            displayToUserFlag = false;
            for (var i = 0; i < apiSourceLength - 1; i++) {
                if (apiSource[i] === 1) {
                    if (EVENTS_ORIGINS_ARRAY[i].localeCompare(itineraryObj.origins) === 0) {
                        displayToUserFlag = true;
                        return displayToUserFlag;
                    }
                }
            }
        }
    }
    
    return displayToUserFlag;
}

export default MultiResultDisplay;
