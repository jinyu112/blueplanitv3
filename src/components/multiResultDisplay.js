import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import SingleResult from './singleResult.js';
import CONSTANTS from '../constants.js';
import misc from '../miscfuncs/misc.js';

export class MultiResultDisplay extends Component {
    constructor(props) {
        super(props);
    }

    handleAddEvent= (e) => {
        this.props.AddUserSelectedEventFromDisplayedResults(e);
    }

    render() {
        var allApiData = this.props.allApiData;
        var pageNumber = this.props.pageNumber;

        if (!misc.isObjEmpty(allApiData)) { // if the allApiData state is NOT empty
            var allApiDataShownToUser = [];            
            var istart = (pageNumber - 1) * CONSTANTS.NUM_RESULTS_PER_PAGE;
            var iApiKeyStart = 0;
            var iEventKeyStart = 0;
            var runningEventCnt = 0;
            var prevRunningEventCnt = 0;
            var iEventStart = 0;

            // find where to start showing the events based on the pagenumber selected
            for (var iapikeys = 0; iapikeys < CONSTANTS.APIKEYS.length; iapikeys++) {
                for (var ievkeys = 0; ievkeys < CONSTANTS.EVENTKEYS.length; ievkeys++) {
                    var eventTemp = allApiData[CONSTANTS.APIKEYS[iapikeys]][CONSTANTS.EVENTKEYS[ievkeys]];
                    if (eventTemp !== undefined) {
                        prevRunningEventCnt = runningEventCnt;
                        runningEventCnt = runningEventCnt + eventTemp.length; // ie eventTemp.length = eventbriteGlobal.Event2.length
                        
                        // if the sum of the event lengths is greater than the start index, 
                        if (runningEventCnt >= istart) {
                            // save the start indices
                            iApiKeyStart = iapikeys;
                            iEventKeyStart = ievkeys;
                            iEventStart = istart - prevRunningEventCnt;
                            // Set indices to the max, to break out of for loops                  
                            iapikeys = CONSTANTS.APIKEYS.length;
                            ievkeys = CONSTANTS.EVENTKEYS.length;
                            break;
                        }
                    }
                }
            }

            // populate allApiDataShownToUser with multiple SingleResult components
            runningEventCnt = 0;
            var ievent;
            var tempItineraryObj;
            for (iapikeys = iApiKeyStart; iapikeys < CONSTANTS.APIKEYS.length; iapikeys++) {
                for (ievkeys = iEventKeyStart; ievkeys < CONSTANTS.EVENTKEYS.length; ievkeys++) {
                    
                    if (allApiData[CONSTANTS.APIKEYS[iapikeys]][CONSTANTS.EVENTKEYS[ievkeys]] !== undefined) { // check if this data structure makes sense
                                                                                                               // ie allApiData.eventbriteGlobal.Breakfast.length doesn't make sense
                        for (ievent = iEventStart; ievent < allApiData[CONSTANTS.APIKEYS[iapikeys]][CONSTANTS.EVENTKEYS[ievkeys]].length; ievent++) {
                            tempItineraryObj = allApiData[CONSTANTS.APIKEYS[iapikeys]][CONSTANTS.EVENTKEYS[ievkeys]][ievent];
                            allApiDataShownToUser.push(<SingleResult key={runningEventCnt} itinObj={tempItineraryObj}
                                AddEvent={this.handleAddEvent} eventKey={ievkeys}/>);
                            runningEventCnt = runningEventCnt + 1;
                            if (runningEventCnt >= CONSTANTS.NUM_RESULTS_PER_PAGE) {
                                iapikeys = CONSTANTS.APIKEYS.length;
                                ievkeys = CONSTANTS.EVENTKEYS.length;
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
                {allApiDataShownToUser}
            </div>
        )
    }
}

export default MultiResultDisplay;
