import React from 'react';
import './UserCard.css';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';

const cardStyle = {
    width: '18rem'
};

export function UserCard({ user, onDelete }) {
    const loggedUser = getLoggedUser();

    return (
        <div className="card m-3" style={cardStyle}>
          
            <div className="card-body">
                <h5 className="card-title"><Link to={`/users/${user.id}`}>{user.username}</Link></h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Age: {user.age}</li>
                <li className="list-group-item">Email: {user.email}</li>
            </ul>
            <div className="card-body d-flex btn-style">
                { loggedUser.isAdmin && <Link to={`/users/edit/${user.id}`} className="btn btn-outline-warning">Edit</Link> }
                { loggedUser.isAdmin && <div  onClick={() => onDelete(user.id)} className="btn btn-outline-danger">Delete</div> }
            </div>
        </div>
    );
}