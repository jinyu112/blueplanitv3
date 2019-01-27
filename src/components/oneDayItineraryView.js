import React, { Component } from 'react';
import styled from 'styled-components';
import GeneralExperienceView from './generalExperienceView';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
margin:8px;
border: 1px solid lightgrey;
border-radius: 2px;
width:33.33%;

`; 
const Title = styled.h3`
padding:8px;
`;
const ExperienceList = styled.div`
padding:8px;
display: flex;
  flex-direction: column;
min-height: 100px;
`; //flex-grow allows the column to grow to fit the content

 class InnerList extends Component {
     shouldComponentUpdate(nextProps) { // this prevents all the experiences to be rerendered whenever an indiv. experience is dragged. this is for optimizing performance
          if (nextProps.experiences === this.props.experiences) {
              return false; //if this method returns false, render is not called (see https://egghead.io/lessons/react-optimize-performance-in-react-beautiful-dnd-with-shouldcomponentupdate-and-purecomponent)
          }
          return true;
     }
     render() {
         return (
             this.props.experiences.map((experience, index) =>
            <GeneralExperienceView key={experience.id} experience={experience} index={index} />)
         );
     }
 }

export class OneDayItineraryView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id} //droppable id is required and needs to be unique in the dragdropcontext                
                >
                    {(provided) => (
                        <ExperienceList ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <InnerList experiences={this.props.experiences} />
                            {provided.placeholder}
                        </ExperienceList>
                    )}
                </Droppable>
            </Container>
        )
    }

}

export default OneDayItineraryView;
