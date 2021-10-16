import React from 'react';
import {ITask} from '../interfaces';

interface Props {
    task: ITask;
    completeTask(taskNameToDelete: string):void;
}

const TodoTask = ({task, completeTask}: Props) => {
    return <div className="task">
        <div className="content">
        <span>{task.taskName}</span>
        <span>{task.deadline}</span>
        </div>
        {/* for users to delete the task when task is completed */}
        <button 
        onClick={() => {
            completeTask(task.taskName);
        }}>
            X
            </button>
        </div>  
};

export default TodoTask;
