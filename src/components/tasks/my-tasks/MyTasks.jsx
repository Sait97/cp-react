import React from 'react';
import { useState, useEffect } from 'react';
import { TasksCard } from '../task-card/TasksCard';
import { getMyTasks } from '../../../core/api/tasks.api';

const listStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
};

export function MyTasks(props) {
    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getMyTasks(searchParam).then((tasks) => {
            setUserTasks(tasks);
        });
    }, [props.location.search]);
    
    return (
        <div className="my-tasks-wrapper container" style={listStyles}>
            { userTasks.map(note => <TasksCard note={note} key={note.id} /> ) }
        </div>
    )
}