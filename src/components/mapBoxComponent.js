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
        }

    }


    componentDidMount() {
        const { lat, lng } = this.props.center;

        var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmx1ZXBsYW5pdCIsImEiOiJjanFmaDVmYXk1NDVjNDhzN2dxMWlrbzRmIn0.AMmiagt2o21LWtfRG_vrRw';
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            center: [lng, lat],
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: this.state.zoom,
        });

        var resultsArray = this.props.results;
        var markers = [];
        var coordinates = [];
        if (resultsArray) {
            if (resultsArray.length > 0) {
                for (var i = 0; i < this.props.results.length; i++) {
                    coordinates = [resultsArray[i].location.lng, resultsArray[i].location.lat];
                    
                    var popUpStr = (i+1) + ". " + " " + 
                        resultsArray[i].name + " (" + misc.convertMilTime(resultsArray[i].time) + ")";

                    var popup = new mapboxgl.Popup({ offset: 25 })
                        .setText(popUpStr); //https://www.mapbox.com/mapbox-gl-js/example/set-popup/

                    var marker = new mapboxgl.Marker()
                    .setLngLat(coordinates)
                    .setPopup(popup)
                    .addTo(this.map);

                    markers.push(marker);
                }
            }
        }

    }

    componentWillUnmount() {
        this.map.remove();
    }


    render() {

        // Map
        const mapClasses = ['maps', 'hidden'];

        if (this.props.show == 'maps') {
            if (this.props.results.length > 0) {
                mapClasses.pop();
            }
        };

        return (
            <div className={mapClasses.join(' ')} ref={el => this.mapContainer = el} />
        )
    }
}

export default MapBoxComponent;
