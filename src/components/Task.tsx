import React, {ChangeEvent, memo, useCallback} from 'react';
import {Button} from "./Button";
import {EditableSpan} from "./EditableSpan";
import {Input} from "./Input";
import {TaskType} from "../TodolistWithRedux";
import {useDispatch} from "react-redux";


type TaskPropsType = {
    task: TaskType;
    updateTask: (taskID: string, newTitle: string) => void;
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void;
    removeTask: (taskId: string) => void;

}
export const Task: React.FC<TaskPropsType> = memo((
    {
        task,
        updateTask,
        changeTaskStatus,
        removeTask
    }
) => {


    function handleOnClick() {
        removeTask(task.id)
    }

    const handleUpdateTask = (taskID: string, newTitle: string) => {
        updateTask(taskID, newTitle)
    }

    const handleOnChangeCheckbox = (taskId: string) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeTaskStatus(taskId, newIsDoneValue);
        }
    }

    return (
        <li
            className={task.isDone ? 'task-completed' : ''}

        >

            <Input type={"checkbox"} checked={task.isDone} onChange={handleOnChangeCheckbox(task.id)}/>
            <EditableSpan oldTitle={task.title}
                          onChange={(newTitle) => handleUpdateTask(task.id, newTitle)}/>
            {/*<span>{task.title}</span>*/}
            <Button
                className={'checkbox'}
                callback={handleOnClick}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                     viewBox="0 0 30 30">
                    <path
                        d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                </svg>
            </Button>

        </li>
    )
});
