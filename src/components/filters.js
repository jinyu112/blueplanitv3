import React, { Component } from 'react';
import ReactDOM, {render} from 'react-dom';
import CONSTANTS from '../constants.js';
import misc from '../miscfuncs/misc.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export class Filter extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="row filters ">
                <div className="col-md-12">
                <DropdownButton title={"asdf"} key={"asdf"} id={`dropdown-basic`}>
        <MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3">Active Item</MenuItem>
        <MenuItem eventKey="4">Separated link</MenuItem>
      </DropdownButton>
            </div>
            </div>
        )
    }
}

export default Filter;
