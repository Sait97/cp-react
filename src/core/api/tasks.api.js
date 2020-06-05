import axios from 'axios';
import { getLoggedUser } from './users.api';

const apiUrl = 'http://localhost:3005';

export const TasksStatus = {
    Done: 'Done',
    Pending: 'Pending execution',
}

export async function getAllTasks(searchParam) {
    const allTasks = (await axios.get(`${apiUrl}/tasks`)).data;

    if (!searchParam)
        return allTasks;

    const loweredParam = searchParam.toLowerCase();
    return allTasks.filter(note => note.title.toLowerCase().includes(loweredParam) || note.content.toLowerCase().includes(loweredParam));
}

export function getTaskById(id) {
    return axios.get(`${apiUrl}/tasks/${id}`);
}

export async function getTasksByAuthorId(authorId, searchParam) {
    const allTasks = await getAllTasks(searchParam);

    return allTasks.filter(note => note.authorId === authorId);
}

export function getMyTasks(searchParam) {
    const loggedUserId = getLoggedUser().id;
    
    return getTasksByAuthorId(loggedUserId, searchParam);
}

export function saveTask(taskData) {
    const loggedUser = getLoggedUser();

    if (taskData.id) {
        return axios.put(`${apiUrl}/tasks/${taskData.id}`, taskData);
    }

    taskData.authorId = loggedUser.id;
    taskData.authorUsername = loggedUser.username;
    taskData.date = new Date();
    if (!taskData.status)
        taskData.status = TasksStatus.Done;

    return axios.post(`${apiUrl}/tasks`, taskData);
}

export function deleteTasks(id) {
    return axios.delete(`${apiUrl}/tasks/${id}`);
}

export async function deleteTasksForAuthor(authorId) {
    const tasks = await getTasksByAuthorId(authorId);

    tasks.forEach(task => {
        deleteTasks(task.id);
    });
}