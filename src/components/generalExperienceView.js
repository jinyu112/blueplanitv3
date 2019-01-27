import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
border:1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom:8px;
background-color:${props => (
    props.isDragDisabled
    ? 'lightgrey'
    : props.isDragging ? "skyblue":"white")};
display: flex;
`;

const Handle = styled.div`
width: 20px;
height: 20px;
background-color: white;
border-radius:3px;
border-width:1px;
border-color:black;
border-style: solid;
margin-right:8px;
`;


export class GeneralExperienceView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isDragDisabled = this.props.experience.id === 'experience-1';
        return (
            <Draggable
                draggableId={this.props.experience.id} //required for draggable
                index={this.props.index} //required for draggable
                isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => (
                    <Container 
                        {...provided.dragHandleProps}      
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                    {/* <Handle  // setting the draghandleprops here allows you to drag only from the handle and not from everywhere on the container div */}
                    {/* /> */}
                        {this.props.experience.content}
                    </Container>
                )}

            </Draggable>
        )
    }

}

export default GeneralExperienceView;
