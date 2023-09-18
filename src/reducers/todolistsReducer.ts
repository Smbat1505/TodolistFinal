import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

// const initialState: TodolistType = {}

export const todolistReducer = (state: TodolistType[], action: RootACTypeForTodolist): TodolistType[] => {
    switch (action.type) {
        case "ADD_TODOLIST": {
            let todolistID = v1();
            let newTodolist: TodolistType = {
                id: todolistID,
                title: action.payload.title,
                filter: 'all'
            }
            let addTodo = [newTodolist, ...state]
            return addTodo
        }

        case "REMOVE_TODOLIST": {

            const {id} = action.payload
            // setTodolists(todolists.filter(todo => todo.id !== todolistID));
            // delete tasks[todolistID]
            const removeTodo = state.filter(t => t.id !== action.payload.id)

            return state.filter(t => t.id !== action.payload.id)
        }

        case "CHANGE_TODOLIST_FILTER": {
            const changeTodoFilter = state.map(t => t.id === action.payload.id ? {
                ...t,
                filter: action.payload.filter
            } : t)
            return changeTodoFilter
        }

        case "UPDATE_TODOLIST_TITLE": {
            const updateTodoTitle = state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
            return updateTodoTitle;
        }

    }
}
export type RootACTypeForTodolist =
    AddTodolistACType
    | UpdateTodolistTitleACType
    | ChangeFilterACType
    | RemoveTodolistACType;

type AddTodolistACType = ReturnType<typeof addTodolistAC>;
type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>;
type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            title,
        }
    } as const
}

export const updateTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "UPDATE_TODOLIST_TITLE",
        payload: {
            id,
            title
        }
    } as const

}

export const changeFilterAC = (id: string, filter: FilterValueType) => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        payload: {
            id,
            filter
        }
    } as const

}

export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE_TODOLIST",
        payload: {
            id,
        }
    } as const
}
