import React, { Component } from 'react';
import CONSTANTS from '../constants.js';
import { DragDropContext } from 'react-beautiful-dnd';
import sampleData from '../sampleData';
import OneDayItineraryView from './oneDayItineraryView';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import '../App.css';
//https://egghead.io/lessons/react-persist-list-reordering-with-react-beautiful-dnd-using-the-ondragend-callback for react-beautiful-dnd tutorial

const Container = styled.div`
display:flex;
width:100%;
`;

export class ItineraryView extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.itineraryData;
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragUpdate = this.onDragUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onDragEnd(results) {
        // reordering and redefining the state
        console.clear();
        const { destination, source, draggableId } = results;
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        const startColumn = this.state.columns[source.droppableId];
        const finishColumn = this.state.columns[destination.droppableId];
        // experience item is dropped in the same column it originated from
        if (startColumn === finishColumn) {
            const newExperienceIds = Array.from(startColumn.experienceIds);
            newExperienceIds.splice(source.index, 1);
            newExperienceIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...startColumn,
                experienceIds: newExperienceIds,
            }

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                }
            };

            this.setState(newState);
            return;
        }

        // experience item is dragged to a column that is not where it originated
        const newStartExperienceIds = Array.from(startColumn.experienceIds);
        newStartExperienceIds.splice(source.index, 1);
        const newStartColumn = {
            ...startColumn,
            experienceIds: newStartExperienceIds,
        }

        const finishExperienceIds = Array.from(finishColumn.experienceIds);
        finishExperienceIds.splice(destination.index, 0, draggableId);
        const newFinishColumn = {
            ...finishColumn,
            experienceIds: finishExperienceIds,
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStartColumn.id]: newStartColumn,
                [newFinishColumn.id]: newFinishColumn,
            }
        }
        this.setState(newState);


    }

    onDragStart() {

    }

    onDragUpdate() {

    }

    handleSubmit() {
        console.log('handlded submit')
    }

    render() {
        return (
            <div>
                <DragDropContext
                    onDragStart={this.onDragStart}
                    onDragEnd={this.onDragEnd} // this is the only required callback function for dragdopcontext
                    onDragUpdate={this.onDragUpdate}>
                    <Container>
                        {this.state.colOrder.map((colId) => {
                            const col = this.state.columns[colId];
                            const experiences = col.experienceIds.map(experienceId => this.state.experiences[experienceId]);
                            return <OneDayItineraryView key={col.id} column={col} experiences={experiences} />;
                        })}
                    </Container>
                </DragDropContext>
            </div>
        );
    }

}

export default ItineraryView;
