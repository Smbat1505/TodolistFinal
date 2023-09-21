import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

const initialState: TodolistType[] = []

export const todolistReducer = (state = initialState, action: RootACTypeForTodolist): TodolistType[] => {
    switch (action.type) {
        case "ADD_TODOLIST": {
            let newTodolist: TodolistType = {
                id: action.payload.todolistID,
                title: action.payload.title,
                filter: 'all'
            }
            let addTodo = [...state, newTodolist]
            return addTodo
        }

        case "REMOVE_TODOLIST": {
            const {id} = action.payload
            const removeTodo = state.filter(t => t.id !== id)

            return removeTodo
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
        default: {
            return state
        }

    }
}
export type RootACTypeForTodolist =
    AddTodolistACType
    | UpdateTodolistTitleACType
    | ChangeFilterACType
    | RemoveTodolistACType;

export type AddTodolistACType = ReturnType<typeof addTodolistAC>;
type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>;
type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            title,
            todolistID: v1()
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
