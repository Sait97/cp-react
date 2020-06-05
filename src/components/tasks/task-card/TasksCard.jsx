import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';
import { TasksStatus } from '../../../core/api/tasks.api';
import './TasksCard.css';

const TasksCardStyle = {
    maxWidth: '18rem'
};




export function TasksCard({ note, onDeleteClick }) {
    const loggedUser = getLoggedUser();

    let taskClassByType = "card text-white m-3 ";
    switch(note.status) {
        case TasksStatus.Done: 
            taskClassByType += "bg-success";
        break;
        case TasksStatus.Pending:
            taskClassByType += "bg-secondary";
        break;
        default: 
            taskClassByType += "bg-success";
        break;
    }

    return (
    <div className={taskClassByType} style={TasksCardStyle}>
        <div className="card-header">
            <div className="btn-style">
                { (loggedUser.isAdmin || loggedUser.id === note.authorId) &&  <Link to={`/tasks/edit/${note.id}`} className="btn btn-outline-warning" > Edit </Link> }
              { (loggedUser.isAdmin || loggedUser.id === note.authorId) && <span  onClick={() => onDeleteClick(note.id)} className="btn btn-outline-danger" > Delete</span> }
            </div>
            <div className="header-title">
                {note.title}
            </div>
        </div>
        <div className="card-body">
            <p className="card-text">{note.content}</p>
        </div>
        <div  className="card-body">
            <p className="card-grade">Grade: {note.grade}</p>
            <p className="card-grade">Status: {note.status}</p>
        </div>
        <div className="card-footer bg-transparent border-secondary">
            <div>Author: {note.authorName}</div>
            <div>Created on: {note.date}</div>
        </div>
    </div>
    )
}