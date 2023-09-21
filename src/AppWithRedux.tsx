import React, {Reducer, useReducer, useState} from 'react';
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

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()
    // const initialTodolistState: TodolistType[] = [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'},
    // ]
    //
    // const [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistType[], RootACTypeForTodolist>>(todolistReducer, initialTodolistState);

    // const initialState: TasksStateType = {
    //     [todolistId1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS&TS', isDone: true},
    //         {id: v1(), title: 'ReactJS/TS', isDone: false},
    //         {id: v1(), title: 'Rest IP', isDone: false},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS&TS', isDone: true},
    //         {id: v1(), title: 'ReactJS/TS', isDone: false},
    //         {id: v1(), title: 'Rest IP', isDone: false},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ],
    // };
    //
    // const [tasks, dispatchToTasks] = useReducer<Reducer<TasksStateType, RootACType>>(taskReducer, initialState);


    function removeTask(todolistID: string, taskID: string) {
        const action = removeTaskAC(todolistID, taskID)
        dispatch(action)
    }

    function addTask(todolistID: string, title: string) {
        const action = addTaskAC(todolistID, title)
        dispatch(action)

    }

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

    function addTodolist(title: string) {
        // debugger
        const action = addTodolistAC(title)
        dispatch(action)
    }

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
                let tasksForTodolist = tasks[todo.id];
                if (todo.filter === 'active') {
                    tasksForTodolist = tasks[todo.id].filter(task => !task.isDone)
                }
                if (todo.filter === 'completed') {
                    tasksForTodolist = tasks[todo.id].filter(task => task.isDone)
                }

                return (
                    <Todolist
                        key={todo.id}
                        todolistID={todo.id}
                        title={todo.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todo.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolistTitle={updateTodolistTitle}
                    />
                )
            })}
        </div>
    );
}

export default AppWithReducer;
