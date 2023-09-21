import {addTaskAC, changeTaskStatusAC, removeTaskAC, taskReducer, updateTaskAC} from "./taskReducer";
import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolistsReducer";

let startState: TasksStateType;
beforeEach(() => {
    startState = {
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

})
test("correct task should be deleted from correct array", () => {
    const action = removeTaskAC('todolistId2', '2')

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

test("correct task should be added to correct array", () => {
    const action = addTaskAC('todolistId2', 'juice')
    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(5)
    expect(endState['todolistId2'].length).toBe(6)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test("status of specified task should be change", () => {
    const action = changeTaskStatusAC('todolistId2', '2', false)
    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)
})

test("title of specified task should be change", () => {
    const action = updateTaskAC('todolistId2', '2', 'beer')
    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('beer')
    expect(endState['todolistId1'][1].title).toBe('JS&TS')
})

test("new array should be added when new todolist is added", () => {
    const action = addTodolistAC("new todolist");
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2")

    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])


})

test("property with todolistID should be deleted", () => {
    const action = removeTodolistAC("todolistId2");
    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()


})