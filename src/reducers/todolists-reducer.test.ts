import { v1 } from "uuid";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    updateTodolistTitleAC,
    todolistReducer,
} from "./todolistsReducer";
import {FilterValueType, TodolistType} from "../App";

describe("todolistReducer tests", () => {
    let todolistId1: string,
        todolistId2: string;
    let startState: TodolistType[];
    let newTodolist: string;

    beforeEach(() => {
        todolistId1 = v1();
        todolistId2 = v1();

        startState = [
            { id: todolistId1, title: "What to learn", filter: "all" },
            { id: todolistId2, title: "What to buy", filter: "all" },
        ];

        newTodolist = "New Todolist";
    });

    test("correct todolist should be removed", () => {
        const endState = todolistReducer(startState, removeTodolistAC(todolistId1));
        expect(endState.length).toBe(1);
        expect(endState[0].id).toBe(todolistId2);
    });

    test("correct todolist should be added", () => {
        const endState = todolistReducer(startState, addTodolistAC(newTodolist));
        expect(endState.length).toBe(3);
        expect(endState[2].title).toBe(newTodolist);
    });

    test("correct todolist should change its name", () => {
        const endState = todolistReducer(
            startState,
            updateTodolistTitleAC(todolistId2, newTodolist)
        );
        expect(endState[0].title).toBe("What to learn");
        expect(endState[1].title).toBe(newTodolist);
    });

    test("correct filter of todolist should be changed", () => {
        let newFilter: FilterValueType = "completed";
        const action = {
            type: "CHANGE_TODOLIST_FILTER",
            id: todolistId2,
            filter: newFilter,
        };
        const endState = todolistReducer(
            startState,
            changeFilterAC(todolistId2, newFilter)
        );

        expect(endState[0].filter).toBe("all");
        expect(endState[1].filter).toBe(newFilter);
    });
});
