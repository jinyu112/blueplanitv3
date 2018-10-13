import '../maps.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper, } from 'google-maps-react';
import React, { Component } from 'react';
import CONSTANTS from '../constants.js'

//https://cloud.google.com/maps-platform/pricing/
// Can I still use google maps platform for free?
// Yes. When you enable billing, you get $200 free usage every month for Maps, Routes, or Places. 
// Based on the millions of users using our APIs today, most of them can continue to use Google Maps 
// Platform for free with this credit.

// What is the pricing after I exceed the $200 monthly free credit?
// You only pay for what you use. You can review rates and access your spending any time in your 
// Google Cloud Platform Console, where you can also set daily quotas to protect against unexpected 
// increases. You can also set billing alerts to receive email notifications when charges reach a preset 
// threshold determined by you.

// Jin: Looks like for each map load there is a per-load cost.
//https://developers.google.com/maps/documentation/javascript/usage-and-billing
//0-100k queries (map loads) = $7 per 1k queries
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }

      // binding this to event-handler functions
      this.onMarkerClick = this.onMarkerClick.bind(this);
      this.onMapClicked = this.onMapClicked.bind(this);
      this.windowHasClosed = this.windowHasClosed.bind(this);
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    windowHasClosed() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        });
    }

    render() {
        //console.log(this.props);
        var markers = [];
        if(this.props.results.length > 0) {
            for(var i = 0; i < this.props.results.length; i++) {
                var key = 'marker' + i;
                var info_key = 'info' + i;
                markers.push(
                    <Marker key={key} onClick={this.onMarkerClick}
                        name={this.props.results[i].name}
                        position={this.props.results[i].location}
                    />
                );
                markers.push(
                    <InfoWindow key={info_key}
                        onClose={this.windowHasClosed}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                         <h6>{this.state.selectedPlace.name}</h6>
                       </div>
                   </InfoWindow>
                )
            }

        }
        return (
          <Map google={this.props.google}
               zoom={CONSTANTS.GMAPS_DEFAULT_ZOOM}
               center={this.props.center}
               className="maps"
               style={maps}
            >

            {markers}
          </Map>

        );
      }
}

const maps = {
    height: '100vh',
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer)
