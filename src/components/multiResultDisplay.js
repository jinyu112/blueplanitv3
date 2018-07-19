import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import SingleResult from './singleResult.js';
import CONSTANTS from '../constants.js';
import misc from '../miscfuncs/misc.js';

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
        //   1) apiData=[Event1:[obj1,...,objn], (event)
        //               Event2:[obj1,...,objn],
        //               Event3:[obj1,...,objn],
        //               Event4:[obj1,...,objn]]
        // OR
        //   2) apiData=[[obj1,...,objn] ,       (yelp restuarant)
        //               [obj1,...,objn] ,
        //               [obj1,...,objn] ]
        var pageNumber = this.props.pageNumber;
        var displayCategory = this.props.displayCategory; // 0 = restaurant data, 1 = event data

        var numArrays = apiData.length;
        var runningEventCnt = 0;
        var prevRunningEventCnt = 0;
        var apiDataShownToUser = [];
        var istart = (pageNumber - 1) * CONSTANTS.NUM_RESULTS_PER_PAGE;
        var iArrayStart = 0;
        var iEventKeyStart = 0;
        var iEventStart =0 ;
        var keys;
        if (displayCategory === 1) {
            keys =['Event1','Event2','Event3','Event4'];
        }
        else {
            keys =['Restaurants'];
        }

        // find where to start showing the events based on the pagenumber selected
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
            // console.log("iArrayStart: " + iArrayStart)
            // console.log("iEventKetStart: " + iEventKeyStart)
            // console.log("iEventStart: " + iEventStart)

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
                    if (tempObjArray!== undefined) { 
                        for (var ievent = iEventStart; ievent < tempObjArray.length; ievent++) {
                            var iItinerary = 0;
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
                                AddEvent={this.handleAddEvent} eventKey={iItinerary}/>);
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
      
        return (
            <div className="ApiDataDisplay">
                {apiDataShownToUser}
            </div>
        )
    }
}

export default MultiResultDisplay;
