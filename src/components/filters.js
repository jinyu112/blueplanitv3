import React, { Component } from 'react';
import CONSTANTS from '../constants.js';
import misc from '../miscfuncs/misc.js';
// import $ from 'jquery';
//import ReactDOM, { render } from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
// import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
// import DropdownButton from 'react-bootstrap/lib/DropdownButton';
// import MenuItem from 'react-bootstrap/lib/MenuItem';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [] ,
        }
    }

    handleSelectChange = (selectedOption) => {

        this.setState(
            {
                value: selectedOption,
            }
        );

    }

    render() {
        console.log("value state:")
        console.log(this.state.value)
        const stayOpen = false;
        const disabled = false;
        const FLAVOURS = [
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Vanilla', value: 'vanilla' },
            { label: 'Strawberry', value: 'strawberry' },
            { label: 'Caramel', value: 'caramel' },
            { label: 'Cookies and Cream', value: 'cookiescream' },
            { label: 'Peppermint', value: 'peppermint' },
        ];

        return (
            <div className="row filters ">
                <div className="col-md-2">
                    <Select
                        closeOnSelect={!stayOpen}
                        disabled={disabled}
                        multi
                        onChange={this.handleSelectChange}
                        options={FLAVOURS}
                        placeholder="Select your favourite(s)"
                        removeSelected={true}
                        rtl={false}
                        simpleValue
                        value={this.state.value}
                    />
            </div>
            </div>
        )
    }
}

export default Filter;
