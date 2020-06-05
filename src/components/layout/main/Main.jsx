import React from 'react';
import { Switch } from 'react-router-dom';
import { UsersList } from '../../users/users-list/UsersList';
import { User } from './../../users/user/User';
import { AuthenticatedRoute } from '../../../core/guards/AuthenticatedRoute';
import { UserEdit } from '../../users/user-edit/UserEdit';
import { TasksList } from '../../tasks/tasks-list/TasksList';
import { TasksEdit } from '../../tasks/edit/TasksEdit';
import { MyTasks } from '../../tasks/my-tasks/MyTasks';

export function Main({ count }) {    
    return (
        <div className="main-content">
            <Switch>
                <AuthenticatedRoute exact path="/users" component={UsersList} />    
                <AuthenticatedRoute exact path="/users/create" admin={true} component={UserEdit} />            
                <AuthenticatedRoute exact path="/users/:id" component={User} />
                <AuthenticatedRoute exact path="/users/edit/:id" admin={true} component={UserEdit} /> 

                <AuthenticatedRoute exact path="/tasks" component={TasksList} />
                <AuthenticatedRoute exact path="/tasks/my-tasks" component={MyTasks} />
                <AuthenticatedRoute exact path="/tasks/create" component={TasksEdit} />
                <AuthenticatedRoute exact path="/tasks/edit/:id" component={TasksEdit} />
             </Switch>
        </div>
    );
}

// export const MainComponent = () => {
//     return (
//         <div className="main-content">
//         <span>Main content is working.</span>
//     </div>
//     );
// }