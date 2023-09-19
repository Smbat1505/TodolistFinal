import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todolistReducer} from "./todolistsReducer";
import {taskReducer} from "./taskReducer";

test("it`s should be equals", () => {
    const startTaskState: TasksStateType = {};
    const startTodolistState: TodolistType[] = [];

    const action = addTodolistAC("new todolist");

    const endTaskState = taskReducer(startTaskState, action);
    const endTodolistState = todolistReducer(startTodolistState, action);

    const keys = Object.keys(endTaskState);
    const idFormTasks = keys[0];
    const idFormTodolists = endTodolistState[0].id;

    expect(idFormTasks).toBe(action.payload.todolistID);
    expect(idFormTodolists).toBe(action.payload.todolistID);
})