import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

export class SingleResult extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return(
<div>
    <img src={this.props.imgurl}/>
    {this.props.title}
    </div>
        )
    }
}

export default SingleResult;
