import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";

export type FilterValueType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType,
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS&TS', isDone: true},
            {id: v1(), title: 'ReactJS/TS', isDone: false},
            {id: v1(), title: 'Rest IP', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS&TS', isDone: true},
            {id: v1(), title: 'ReactJS/TS', isDone: false},
            {id: v1(), title: 'Rest IP', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    });


    function removeTask(todolistID: string, taskID: string) {
        let todolistTasks = tasks[todolistID]

        tasks[todolistID] = todolistTasks.filter(t=>t.id !== taskID)

        setTasks({...tasks});
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
    }

    function addTask(todolistID: string, title: string) {
        const task = {id: v1(), title, isDone: false};
        const newTasks = {...tasks, [todolistID]: [task, ...tasks[todolistID]]}
        setTasks(newTasks)

    }

    function changeTaskStatus(todolistID: string, taskID: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, isDone} : task)})
    }

    function changeFilter(todolistID: string, filter: FilterValueType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter} : el))
    }

    function removeTodolist(todolistID: string,) {
        setTodolists(todolists.filter(todo => todo.id !== todolistID));
        delete tasks[todolistID]
    }

    //TODO
    // если нужно что-то поменять то мар
    // если удалить то filter

    function addTodolist(title: string) {
        let todolistID = v1();
        let newTodolist: TodolistType = {
            id: todolistID,
            title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [todolistID]: []})
        // alert('hi')
    }

    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, title: newTitle} : task)
        })
    }

    const updateTodolistTitle = (todolistID: string, title: string) => {
        setTodolists(todolists.map(todo => todo.id === todolistID ? {...todo, title} : todo))
        console.log(title)
    }

    return (
        <div className="App">

            <AddItemForm callback={addTodolist}/>
            {todolists.map(todo => {
                let tasksForTodolist = tasks[todo.id];
                if (todo.filter === 'active') {
                    tasksForTodolist = tasks[todo.id].filter(task => !task.isDone)
                    console.log(tasksForTodolist)
                }
                if (todo.filter === 'completed') {
                    tasksForTodolist = tasks[todo.id].filter(task => task.isDone)
                    console.log(tasksForTodolist)
                }

                console.log(tasksForTodolist)
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

export default App;
