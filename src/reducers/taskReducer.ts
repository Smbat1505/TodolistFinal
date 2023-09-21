import {TaskType} from "../Todolist";
import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolistsReducer";

const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: RootACType): TasksStateType => {
    switch (action.type) {

        case "REMOVE_TASK": {
            const {todolistID, taskID} = action.payload;
            const updatedTasks = state[todolistID].filter((task) => task.id !== taskID);
            return {
                ...state,
                [todolistID]: updatedTasks
            };
        }
        case "ADD_TASK": {
            const {todolistID, title} = action.payload;
            const task = {id: v1(), title, isDone: false};
            const newTask = {...state, [todolistID]: [task, ...state[todolistID]]}
            return newTask
        }
        case "CHANGE_TASK_STATUS": {
            const {todolistID, taskID, isDone} = action.payload;

            const changeTaskStatus = {
                ...state,
                [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, isDone} : t)
            }

            return changeTaskStatus
        }
        case "UPDATE_TASK": {
            const {todolistID, taskID, newTitle} = action.payload;
            const updateTask = {
                ...state,
                [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, title: newTitle} : t)
            }
            return updateTask
        }
        case "ADD_TODOLIST": {
            const {todolistID} = action.payload
            return {
                ...state,
                [todolistID]: []
            }
        }
        case "REMOVE_TODOLIST": {
            // const {id} = action.payload;
            // const updatedState = {...state};
            // delete updatedState[id];
            // return updatedState;

            const {id} = action.payload;
            const {[id]: _, ...newState} = state;
            return newState;

            // TODO In this approach:
            //
            //     We use object destructuring to extract the property with the specified id from the state. The _ (underscore) variable is used as a throwaway variable to ignore the property's value.
            //
            // We use the rest/spread operator (...) to create a new object with all properties from the original state except for the one with the specified id.
            //
            //     This way, you can remove a specific todolistID without modifying the original state object and without using an index signature.
        }

        default : {
            return state
        }
    }
}


export type RootACType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | UpdateTaskACType
    | AddTodolistACType
    | RemoveTodolistACType;
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: "REMOVE_TASK",
        payload: {
            todolistID,
            taskID
        }
    } as const
}

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: "ADD_TASK",
        payload: {
            todolistID,
            title
        }
    } as const
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: "CHANGE_TASK_STATUS",
        payload: {
            todolistID,
            taskID,
            isDone
        }
    } as const
}

export const updateTaskAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {
        type: "UPDATE_TASK",
        payload: {
            todolistID,
            taskID,
            newTitle
        }
    } as const
}
