import {removeTaskAC, taskReducer} from "./taskReducer";
import {TasksStateType} from "../App";
import {v1} from "uuid";

test("correct task should be deleted from correct array", () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS&TS', isDone: true},
            {id: '3', title: 'ReactJS/TS', isDone: false},
            {id: '4', title: 'Rest IP', isDone: false},
            {id: '5', title: 'GraphQL', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS&TS', isDone: true},
            {id: '3', title: 'ReactJS/TS', isDone: false},
            {id: '4', title: 'Rest IP', isDone: false},
            {id: '5', title: 'GraphQL', isDone: false},
        ],
    }

    const action = removeTaskAC( 'todolistId2', '2')

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS&TS', isDone: true},
            {id: '3', title: 'ReactJS/TS', isDone: false},
            {id: '4', title: 'Rest IP', isDone: false},
            {id: '5', title: 'GraphQL', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '3', title: 'ReactJS/TS', isDone: false},
            {id: '4', title: 'Rest IP', isDone: false},
            {id: '5', title: 'GraphQL', isDone: false},
        ],
    })
})