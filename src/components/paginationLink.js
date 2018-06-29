import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

// This component serves as the number link for pagniation purposes. Its input property is the page number
// AND it relates that page number back to the parent component if it is clicked.
export class PaginationLink extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.onPageLinkClick(this.props.pageNumber);
    }

    render() {        

        return (
            <a href="javascript:void(0)" onClick={this.handleClick}> {this.props.pageNumber} </a>            
        )
    }
}

export default PaginationLink;
