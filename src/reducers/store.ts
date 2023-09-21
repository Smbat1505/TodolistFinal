import {taskReducer} from "./taskReducer";
import {todolistReducer} from "./todolistsReducer";
import {combineReducers, createStore, legacy_createStore} from "redux";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolist: todolistReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

// {
//     state: {
//         tasks: {},
//         todolists: []
//     }
//     getState()
//     dispatch()
//     subscribe()
// }