import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { Component } from 'react';
import seatgeek from '../images/seatgeek.png';
import meetup from '../images/meetup-wordmark-red.png';
import yelp from '../images/yelp_logo.png';
import googleplaces from '../images/googleplaces.png';
import eventbrite from '../images/eventbrite.png';
import instagram from '../images/instagram-logo.png';
import facebook from '../images/facebook-logo.png';

export class Footer extends Component {
    constructor(props) {
        super(props);
    }



    render() {

        return (
            <div className="row eventsCont footer">
                <div className="col-md-2 offset-md-2">
                    <ul className="footer-1">
                        <li><strong>BLUE</strong> PLANIT</li>
                        <li>About Us</li>
                        <li><a href="http://blue-planit.com/" target="_blank">Blog</a></li>
                        <li>Contact</li>
                    </ul>


                </div>
              <div className="col-md-2">
                  <ul>
                      <li><strong>LEGAL</strong></li>
                      <li>Privacy</li>
                      <li>Terms</li>
                      <li>Site Map</li>
                  </ul>

              </div>
            <div className="col-md-2">
                <ul className="social-icons">
                    <li><strong>CONNECT WITH US</strong></li>
                    <li className="hover-item"><img src={facebook}/></li>
                    <li className="hover-item"><img src={instagram}/></li>
                </ul>
            </div>
              <div className="col-md-2">
                  <ul className="footer-2">
                      <li><strong>POWERED BY</strong></li>
                      <li className="hover-item"><a href="http://meetup.com"><img src={meetup}/></a></li>
                      <li className="hover-item"> <a href="http://eventbrite.com"><img src={eventbrite}/></a></li>
                      <li className="hover-item"><a href="http://google.com"><img src={googleplaces}/></a></li>
                      <li className="hover-item"><a href="http://seatgeek.com"><img src={seatgeek}/></a></li>
                      <li className="hover-item yelp-item"><a href="http://yelp.com"><img src={yelp}/></a></li>
                  </ul>
              </div>
          </div>
        )
    }
}

export default Footer;
