import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistReducer,
    updateTodolistTitleAC
} from "./todolistsReducer";

test("correct todolist should be removed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test("correct todolist should be added", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolist = 'New Todolist'

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolist);
})


test("correct todolist should change it`s name", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolist = 'New Todolist'


    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistReducer(startState, updateTodolistTitleAC(todolistId2, newTodolist))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolist);
})

test("correct filer of todolist should be change ", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFiler: FilterValueType = 'completed'


    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: "CHANGE_TODOLIST_FILTER",
        id: todolistId2,
        filter: newFiler
    }

    const endState = todolistReducer(startState, changeFilterAC(todolistId2, newFiler))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFiler);
})


