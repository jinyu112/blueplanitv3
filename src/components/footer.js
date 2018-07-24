import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { Component } from 'react';

export class Footer extends Component {
    constructor(props) {
        super(props);
    }



    render() {

        return (
            <div className="row eventsCont footer">
            <div className="col-md-4" >
              Powered by <br/><a href="http://meetup.com"> MeetUp.com</a><br/> 
              <a href="http://yelp.com">Yelp.com</a><br/>
              <a href="http://eventbrite.com"> EventBrite.com</a><br/>
              <a href="http://seatgeek.com">SeatGeek.com</a><br/>
              <a href="http://google.com"> Google</a>

              </div>
              <div className="col-md-4" >
              Copyright Blue Planit 2018 | About Us

              </div>
              <div className="col-md-4" >
              Privacy | Terms | Contact

              </div>
          </div>
        )
    }
}

export default Footer;
