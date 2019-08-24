import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    format,
    differenceInMinutes,
    differenceInHours,
    differenceInSeconds} from 'date-fns';
import {setTaskStatus} from '../../actions';
import TaskItem from '../TaskItem/TaskItem';
import {TODO, IN_PROGRESS, DONE} from '../../configs/constants';

class Task extends Component {

    setStatusToInProgress = (uuid, status) => {

        const timestamp = format(new Date(), 'yyyy-MM-dd::HH:mm:ss');
        if (status === IN_PROGRESS)
            this.props.setTaskStatus(uuid, Object.assign({}, {status}, {orderInProgressTimestamp : timestamp}));
        else if (status === DONE)
            this.props.setTaskStatus(uuid, Object.assign({}, {status}, {orderCompleteTimestamp : timestamp}));
        else if (status === TODO)
            this.props.setTaskStatus(uuid, Object.assign({}, {status}));
        // const {workOrder} = this.props;



        // for (let order = 0; order < workOrder.length; order++) {
        //     if (workOrder[order].id === uuid){
        //         // const newOrderObj = Object.assign({}, workOrder[order], {status})
        //         // const newWorkOrder = [...workOrder]
        //         // newWorkOrder[order] = newOrderObj;
        //         return;
        //     }
        // }
    }

    cleanElapsedTime = time => {
        const currentTimestamp = new Date();
        const givenTimestamp = new Date(time);
        const secDiff = differenceInSeconds(currentTimestamp, givenTimestamp);
        if (secDiff < 60) return `${secDiff}s`;
        const minDiff = differenceInMinutes(currentTimestamp, givenTimestamp);
        if (minDiff < 60) return `${minDiff}m ${secDiff-(60*minDiff)}s`;
        const hourDiff = differenceInHours(currentTimestamp, givenTimestamp);
        if (hourDiff < 60) return `${hourDiff}h ${minDiff-(60*hourDiff)}m`;
    }

    render() {
        const {order, id, customerName, hasPaid, isHighPriority, orderSubmitTimestamp, status} = this.props;

        return (
            <div className="task">
                <div className="task__container">
                    <div className="task__wrapper">
                        {
                            isHighPriority &&
                            <div className="task__ribbon">Priority</div>
                        }
                        <div className="task__header">
                            <div className="task__time">
                                {this.cleanElapsedTime(orderSubmitTimestamp)}
                            </div>
                            <div className="task__title">
                                {customerName}
                            </div>
                        </div>
                        {
                            status !== DONE &&
                        <div className="task__description">
                            {
                                order.map((item, idx) => {
                                    return <TaskItem key={idx} {...item} />
                                })
                            }
                        </div>
                        }
                        <div className="task__actions">
                            {
                                status === TODO &&
                                <button onClick={()=>{this.setStatusToInProgress(id, IN_PROGRESS)}}>Start Task</button>
                            }
                            {
                                status === IN_PROGRESS &&
                                (<>
                                    <button onClick={()=>{this.setStatusToInProgress(id, DONE)}}>Done</button>
                                    <button onClick={()=>{this.setStatusToInProgress(id, TODO)}}>Back TO DO</button>
                                </>
                                )
                            }
                            {
                                status === DONE &&
                                (<>
                                    <button onClick={()=>{this.setStatusToInProgress(id, IN_PROGRESS)}}>Back TO In Progress</button>
                                </>
                                )
                            }
                        </div>
                    </div>
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

export default connect(mapStateToProps, {setTaskStatus})(Task);
