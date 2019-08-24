import React, { Component } from 'react';
import {connect} from 'react-redux';
import {listenCartOrders} from '../../actions';
import Task from '../Task/Task';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TODO, IN_PROGRESS, DONE } from '../../configs/constants';
import Lane from '../Lane/Lane';

class Queue extends Component {

    componentDidMount() {
        this.props.listenCartOrders();
    }

    render() {
        const {workOrder} = this.props;
        return (
            <div className="queue">
                <div className="queue__container">
                    <Lane title={TODO} list={workOrder}/>
                    <Lane title={IN_PROGRESS} list={workOrder}/>
                    <Lane title={DONE} list={workOrder}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ workOrder }) => {
    return {
        workOrder
    };
  };
  
  export default connect(mapStateToProps, {listenCartOrders})(Queue);
