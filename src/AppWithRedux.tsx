import React, {Reducer, useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    RootACType,
    taskReducer,
    updateTaskAC
} from "./reducers/taskReducer";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC, RootACTypeForTodolist,
    todolistReducer,
    updateTodolistTitleAC
} from "./reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType,
}

export type TasksStateType = {
    [key: string]: TaskType[];
}

function AppWithReducer() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    // let state = useSelector<AppRootStateType, AppRootStateType>(state => state);
    // const todolists = state.todolist;
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTask(todolistID: string, taskID: string) {
        const action = removeTaskAC(todolistID, taskID)
        dispatch(action)
    }

    const addTask = useCallback((todolistID: string, title: string) => {
        const action = addTaskAC(todolistID, title)
        dispatch(action)

    }, [dispatch])

    function changeTaskStatus(todolistID: string, taskID: string, isDone: boolean) {
        const action = changeTaskStatusAC(todolistID, taskID, isDone)
        dispatch(action);
    }


    function changeFilter(todolistID: string, filter: FilterValueType) {
        const action = changeFilterAC(todolistID, filter)
        dispatch(action)
    }

    function removeTodolist(todolistID: string,) {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }

    //TODO
    // если нужно что-то поменять то мар
    // если удалить то filter

    const addTodolist = useCallback((title: string) => {
        // debugger
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        const action = updateTaskAC(todolistID, taskID, newTitle)
        dispatch(action)
    }

    const updateTodolistTitle = (todolistID: string, title: string) => {

        const action = updateTodolistTitleAC(todolistID, title)
        dispatch(action)
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            {todolists.map(todo => {
                return (
                    <TodolistWithRedux key={todo.id} todolist={todo}/>
                    // <Todolist
                    //     key={todo.id}
                    //     todolistID={todo.id}
                    //     title={todo.title}
                    //     tasks={tasks[todo.id]}
                    //     removeTask={removeTask}
                    //     changeFilter={changeFilter} addTask={addTask} changeTaskStatus={changeTaskStatus}
                    //     filter={todo.filter} removeTodolist={removeTodolist} updateTask={updateTask}
                    //     updateTodolistTitle={updateTodolistTitle}
                    // />
                )
            })}
        </div>
    );
}

export default AppWithReducer;
