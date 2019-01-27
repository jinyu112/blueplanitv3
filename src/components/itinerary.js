import React, { PureComponent } from 'react';
import ItineraryView from './itineraryView';
import ApiService from './ApiService.js'
import CONSTANTS from '../constants';
const geocoder = require('geocoder');

class Itinerary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            didAsyncOperationFinish: false,
            allApiData: {},
        };
        this.apiService = new ApiService();
    }

    componentDidMount() {
        const inputs = this.props.inputs;
        const data_latlon = inputs.data_latlon;
        const date = inputs.startDate.toDate();
        const searchRadius = inputs.searchRadius;
        const eventType = inputs.eventType;
        var city = inputs.location;

        if (data_latlon.results && data_latlon.results.length > 0) {

            // Construct lat/long string from geocoder from user input
            var lat = data_latlon.results[0].geometry.location.lat;
            var lon = data_latlon.results[0].geometry.location.lng;
            var locationLatLong = lat + ',' + lon;

            // Do reverse geocode to get the city from the lat long (for seat geek api call)
            // this offers robustness to the user input for the location
            geocoder.reverseGeocode(lat, lon, function (err, data_city) {
                if (data_city) {
                    if (data_city.results) {
                        var dataLength = data_city.results.length;

                        // find the city portion of the data
                        for (var i = 0; i < dataLength; i++) {
                            if (data_city.results[i].types) {
                                if (data_city.results[i].types[0] === "locality") {
                                    if (data_city.results[i].address_components) {
                                        city = data_city.results[i].address_components[0].long_name;
                                        break;
                                    }
                                }
                            }
                        }

                        // actually get the experience/restaurant data that will populate the itinerary
                        var promiseObj = this.apiService.getData(
                            eventType,
                            locationLatLong,
                            city,
                            date,
                            date.toString(),
                            searchRadius);
                        promiseObj.then(function (data) {

                            console.log(data)
                            const allApiDataFormatted = processAPIDataForItineraryView(data.data, this.props.inputs)
                            this.setState({
                                didAsyncOperationFinish: true,
                                allApiData: allApiDataFormatted,
                            })
                        }.bind(this), function (err) {
                            return err;
                        }).catch(function (e) {
                            console.log(e)
                        }.bind(this));

                    }
                }
            }.bind(this), { key: process.env.REACT_APP_GOOGLE_API_KEY })
        }

    }

    render() {
        const { didAsyncOperationFinish } = this.state;

        if (!didAsyncOperationFinish) {
            return (
                <div>loading</div>
            ); // You can return some spinner here
        }

        console.log("renderging!!")
        console.log(this.state.allApiData)

        return (
            <ItineraryView
                itineraryData={this.state.allApiData} />
        );
    }
}

function processAPIDataForItineraryView(allApiData_in, inputs) {
    var allApiDataFormattedArray = allApiData_in.seatgeekItemsGlobal.concat(allApiData_in.yelpLunchItemsGlobal);
    var allApiDataFormatted = {};
    allApiDataFormatted.experiences = parseApiDataArray(allApiDataFormattedArray);

    // temporarily allocating the experiences to each day (this will be where the GA comes in in the future)
    const numExperiences = allApiDataFormatted.experiences.IdArray.length
    var tempExpIdArray = new Array();
    while (allApiDataFormatted.experiences.IdArray.length > 0)
        tempExpIdArray.push(allApiDataFormatted.experiences.IdArray.splice(0,
            Math.ceil(numExperiences / inputs.numDays)));

    var tempObj = {}
    var tempColOrder = [];
    var tempDate;
    for (var i = 0; i < inputs.numDays; i++) {
        var idNum = i + 1;
        tempDate = new Date(inputs.startDate + i * CONSTANTS.DAY_2_MILLISECONDS);
        tempObj[CONSTANTS.COLUMN_ID_PREFIX + idNum] = {
            id: CONSTANTS.COLUMN_ID_PREFIX + idNum,
            title: tempDate.toDateString(),
            experienceIds: tempExpIdArray[i],
        }
        tempColOrder.push(CONSTANTS.COLUMN_ID_PREFIX + idNum)
    }

    allApiDataFormatted.columns = tempObj;
    allApiDataFormatted.colOrder = tempColOrder;

    console.log(allApiDataFormatted)
    return allApiDataFormatted;
}

function parseApiDataArray(array_in) {
    var tempObj = {};
    var experienceIdsArray = [];
    for (var i = 0; i < array_in.length; i++) {
        var idNum = i + 1;
        tempObj[CONSTANTS.EXPERIENCE_ID_PREFIX + idNum] = {
            id: CONSTANTS.EXPERIENCE_ID_PREFIX + idNum,
            content: array_in[i].name,
        };
        experienceIdsArray.push(CONSTANTS.EXPERIENCE_ID_PREFIX + idNum);
    }
    tempObj.IdArray = experienceIdsArray;
    console.log(tempObj)
    return tempObj;
}


// const sampleData ={
//     experiences: {
//         experience1: {id:'experience1',content:'take out the garbage again and again. it never gets done. '},
//         experience2: {id:'experience2',content:'watch fav show. which is friends'},
//         experience3: {id:'experience3',content:'charge phone'},
//         experience4: {id:'experience4',content:'cook dinnere'},
//         experience5: {id:'experience5',content:'clean up'},
//         experience6: {id:'experience6',content:'work on app'},
//         experience7: {id:'experience7',content:'go to bjj'},
//     },
//     columns: {
//         'col-1': {id: 'col-1',title:'To do',experienceIds:['experience1','experience2','experience3','experience4']},
//         'col-2': {id: 'col-2',title:'In progress',experienceIds:['experience5']},
//         'col-3': {id: 'col-3',title:'Done',experienceIds:['experience6']},
//         'col-4': {id: 'col-4',title:'Limbo',experienceIds:['experience7']},
//         'col-5': {id: 'col-5',title:'Maybe',experienceIds:[]},
//     },
//     colOrder: ['col-1','col-2','col-3','col-4','col-5'],
// };

export default Itinerary;