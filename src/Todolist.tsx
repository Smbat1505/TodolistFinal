import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useMemo, useState} from 'react';
import {Input} from "./components/Input/Input";
import {Button} from "./components/Button/Button";
import "./todolist.css"
import {FilterValueType} from "./App";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Task} from "./components/Task/Task";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TodolistPropsType = {
    todolistID: string;
    title: string;
    tasks: TaskType[];
    removeTask: (todolistID: string, taskID: string) => void;
    changeFilter: (todolistID: string, value: FilterValueType) => void;
    addTask: (todolistID: string, title: string) => void;
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void;
    filter: FilterValueType;
    removeTodolist: (todolistID: string,) => void;
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void;
    updateTodolistTitle: (todolistID: string, newTitle: string) => void;
}


export const Todolist: React.FC<TodolistPropsType> = memo((
    {
        todolistID,
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter,
        removeTodolist,
        updateTask,
        updateTodolistTitle
    }
) => {

    const handleAllClick = useCallback(() => {
        changeFilter(todolistID, 'all')
    }, [changeFilter, todolistID])

    const handleActiveClick = useCallback(() => {
        changeFilter(todolistID, 'active')
    }, [changeFilter, todolistID])

    const handleCompletedClick = useCallback(() => {
        changeFilter(todolistID, 'completed')
    }, [changeFilter, todolistID])

    const handleRemoveTodolist = useCallback(() => {
        removeTodolist(todolistID);
    }, [removeTodolist, todolistID])

    const handleAddTask = useCallback((newTodoTitle: string) => {
        addTask(todolistID, newTodoTitle)
    }, [addTask, todolistID]);

    const handleUpdateTodolistTitle = useCallback((newTitle: string) => {
        updateTodolistTitle(todolistID, newTitle)
    }, [updateTodolistTitle, todolistID])


    const handleRemoveTask = useCallback((taskId: string) => {
        removeTask(todolistID, taskId)
    }, [removeTask, todolistID])


    const handleUpdateTask = useCallback((taskID: string, newTitle: string) => {
        updateTask(todolistID, taskID, newTitle)
    }, [updateTask, todolistID])

    const handleOnChangeCheckbox = useCallback((taskId: string) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeTaskStatus(todolistID, taskId, newIsDoneValue);
        }
    }, [changeTaskStatus, todolistID])


    let TASKS = tasks;
    TASKS = useMemo(()=> {
        if (filter === 'active') {
            TASKS = TASKS.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            TASKS = TASKS.filter(task => task.isDone)
        }

        return TASKS
    }, [TASKS, filter])


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
                        <Task
                            key={task.id}
                            task={task}
                            updateTask={handleUpdateTask}
                            changeTaskStatus={handleOnChangeCheckbox}
                            removeTask={handleRemoveTask}
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


// *********************** example *********************** //
type ButtonWithChildrenType = {
    children: React.ReactNode
}
const UniversalWithChildren: React.FC<ButtonWithChildrenType> = memo(({children}) => {
    return <>children</>
})