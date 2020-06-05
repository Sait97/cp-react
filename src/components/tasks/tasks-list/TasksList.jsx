import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllTasks, deleteTasks } from '../../../core/api/tasks.api';
import { TasksCard } from '../task-card/TasksCard';

const listStyles = {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '50px'
};

export function TasksList(props) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getAllTasks(searchParam).then((result) => {
            setNotes(result);
        });
    }, [props.location.search])

    const onDelete = (id) => {
        deleteTasks(id).then(() => {
            setNotes((prevState) => {
                return prevState.filter(note => note.id !== id);
            })
        })
    };
    
    return (
        <div className="notes-list-wrapper d-flex container" style={listStyles}>
            { notes.map(note => <TasksCard note={note} key={note.id} onDeleteClick={onDelete} /> )}
        </div>
    );
}