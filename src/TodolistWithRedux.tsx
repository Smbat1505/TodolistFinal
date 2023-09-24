import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import {Input} from "./components/Input";
import {Button} from "./components/Button";
import "./todolist.css"
import {FilterValueType} from "./App";
import AddItemForm from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from "./reducers/taskReducer";
import {changeFilterAC, removeTodolistAC, updateTodolistTitleAC} from "./reducers/todolistsReducer";
import {TaskWithRedux} from "./components/TaskWithRedux";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TodolistPropsType = {
    todolist: TodolistType
}


export const TodolistWithRedux: React.FC<TodolistPropsType> = memo((
    {
        todolist
    }
) => {

    console.log('rerender: TodolistWithRedux')

    const {id, title, filter} = todolist;

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id]);
    const dispatch = useDispatch()

    const handleAllClick = useCallback(() => {
        dispatch(changeFilterAC(id, "all"))

    }, [id, dispatch])

    const handleActiveClick = useCallback(() => {
        dispatch(changeFilterAC(id, "active"))
    }, [id, dispatch])

    const handleCompletedClick = useCallback(() => {
        dispatch(changeFilterAC(id, "completed"))
    }, [id, dispatch])

    const handleRemoveTodolist = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [id, dispatch])

    const handleAddTask = useCallback((title: string) => {
        dispatch(addTaskAC(id, title))
    }, [id, dispatch]);

    const handleUpdateTodolistTitle = useCallback((newTitle: string) => {
        dispatch(updateTodolistTitleAC(id, newTitle))
    }, [id, dispatch])

    const handleUpdateTask = useCallback((taskID: string, newTitle: string) => {
        dispatch(updateTaskAC(id, taskID, newTitle))
    }, [id, dispatch])

    const handleOnChangeCheckbox = useCallback((taskId: string) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(id, taskId, newIsDoneValue))
        }
    }, [id, dispatch])

    const handleOnClick = useCallback((taskId: string) => {
        dispatch(removeTaskAC(id, taskId))
    }, [id, dispatch])

    let TASKS = tasks;
    if (filter === 'active') {
        TASKS = TASKS.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        TASKS = TASKS.filter(task => task.isDone)
    }


    return (


        <div>
            <h3>
                <EditableSpan oldTitle={title} onChange={handleUpdateTodolistTitle}/>
                <Button callback={handleRemoveTodolist}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                         viewBox="0 0 30 30">
                        <path
                            d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                    </svg>
                </Button>
            </h3>
            <AddItemForm callback={handleAddTask}/>
            <ul>
                {TASKS.map(task => {

                    return (
                        <TaskWithRedux
                            key={task.id}
                            task={task}
                            todolistId={id}
                        />
                    )
                })}
            </ul>
            <div>
                <Button
                    name={'All'}
                    callback={handleAllClick}
                    className={filter === 'all' ? 'active-filter' : 'active-filters'}
                />
                <Button
                    name={'Active'}
                    callback={handleActiveClick}
                    className={filter === 'active' ? 'active-filter' : 'active-filters'}
                />
                <Button
                    name={'Completed'}
                    callback={handleCompletedClick}
                    className={filter === 'completed' ? 'active-filter' : 'active-filters'}
                />
            </div>
        </div>
    )
})