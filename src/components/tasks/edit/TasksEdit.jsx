import React, { useState, useEffect } from 'react';
import { saveTask, getTaskById } from '../../../core/api/tasks.api';
import { Redirect } from 'react-router-dom';
import './Tasks.css';

export function TasksEdit(props) {

    const [currentTasks, setcurrentTasks] = useState({title: '', content: '', grade: '', authorId: '', authorUsername: '', date: '' });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    console.log(props);
    useEffect(() => {
        if (props.computedMatch.params.id) {
            getTaskById(props.computedMatch.params.id).then((result) => {
                setcurrentTasks(result.data);
            });
        }
    }, [props.computedMatch.params.id])

    const onInputChange = (event) => {
        event.persist();
        setcurrentTasks((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onTaskSave = (event) => {
        event.preventDefault();
        saveTask(currentTasks).then(() => { 
            setShouldRedirect(true);
        })
        .catch((err) => console.error(err));
    }

    return (
        <>
        { shouldRedirect && <Redirect to="/tasks" /> }
        <div className="tasks-edit-wrapper">
            <form className="tasks-edit-form" onSubmit={onTaskSave}>
                <div className="form-group">
                    <label labelfor="title">Title: </label>
                    <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={currentTasks.title} />
                </div>
                <div className="form-group">
                    <label labelfor="content">Content: </label>
                    <textarea className="form-control" id="content" name="content" onChange={onInputChange} value={currentTasks.content} />
                </div>
                <div className="form-group">
                    <label labelfor="grade">Grade: </label>
                    <input className="form-control" id="grade" name="grade" type="number" min="0" max="10" onChange={onInputChange} value={currentTasks.grade} />
                </div>
                <div className="form-group">
                    <label labelfor="status">Status: </label>
                    <select className="form-control" id="status" name="status" onChange={onInputChange} value={currentTasks.status}>
                        <option value="Done">Done</option>
                        <option value="Pending execution">Pending execution</option>
                        
                    </select>
                </div>
                <button className="btn btn-primary">Save Tasks</button>
            </form>
        </div>
        </>
    )
}