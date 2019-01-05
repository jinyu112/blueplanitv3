import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import CONSTANTS from '../constants.js'
import misc from '../miscfuncs/misc.js'

export class MapBoxComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 34,
            lng: 5,
            zoom: CONSTANTS.GMAPS_DEFAULT_ZOOM,
            allMarkers: [],
        }

        this.onClick = this.onClick.bind(this);
        this.handleMarkers = this.handleMarkers.bind(this);
    }

    onClick(e) {
        console.log("marker onclick")
        console.log(e)
    }
    handleMarkers() {
        console.log('looooook at meeeee', this.props.results);
        var resultsArray = this.props.results

        var markers = [];
        var coordinates = [];
        var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

        if (resultsArray) {
            if (resultsArray.length > 0) {
                //https://www.mapbox.com/help/custom-markers-gl-js/ to implement custom markers
                for (var i = 0; i < this.props.results.length; i++) {
                    console.log(resultsArray[i].location)
                    if(resultsArray[i].location.lng !== NaN && resultsArray[i].location.lat !== NaN) {
                        coordinates = [resultsArray[i].location.lng, resultsArray[i].location.lat];

                        var popUpStr = (i+1) + ". " + " " +
                            resultsArray[i].name + " (" + misc.convertMilTime(resultsArray[i].time) + ")";

                        var popup = new mapboxgl.Popup({ offset: 25 })
                            .setText(popUpStr); //https://www.mapbox.com/mapbox-gl-js/example/set-popup/

                        var marker = new mapboxgl.Marker()
                            .setLngLat(coordinates)
                            .setPopup(popup)
                            .addTo(this.map)
                            .on('click',this.onClick);

                        markers.push(marker);
                    }
                }
            }
        }
    }
    componentDidMount() {
        const { lat, lng } = this.props.center;

        var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmx1ZXBsYW5pdCIsImEiOiJjanFmaDVmYXk1NDVjNDhzN2dxMWlrbzRmIn0.AMmiagt2o21LWtfRG_vrRw';
        this.map = new mapboxgl.Map({
            container: 'mapBoxID',
            center: [lng, lat],
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: this.state.zoom,
        });
    }

    componentWillUnmount() {
        this.map.remove();
    }


    render() {
        if (this.map) {
            this.handleMarkers();
        }

        return (
            //<div className={mapClasses.join(' ')} ref={el => this.mapContainer = el} />
            <div></div>
        )
    }
}

export default MapBoxComponent;
