import React, { Component } from 'react'
import Task from '../Task/Task';
import { TODO, IN_PROGRESS, DONE } from '../../configs/constants';

export default class Lane extends Component {


    readableTitle = title => {
        if (title === TODO) {
            return 'To Do'
        } else if (title === IN_PROGRESS) {
            return 'In Progress'
        } else if (title === DONE) {
            return 'Done'
        }
        return '';
    }

    render() {
        const {title, list} = this.props;

        const filteredList = list && list.filter(task => {
            return task.status === title
        }) || []

        return (
            <div className="lane">
                <div className="lane__container">
                    <div className="lane__title">({filteredList.length}) {this.readableTitle(title)}</div>
                    <div className="lane__wrapper">
                        {
                            filteredList.map(task => {
                                if (task.status === title)
                                    return <Task key={task.id} {...task}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
