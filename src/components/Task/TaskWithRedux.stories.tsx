import type {Meta, StoryObj} from '@storybook/react';
import {TaskWithRedux} from "./TaskWithRedux";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {TaskType} from "../../Todolist";
import {v1} from "uuid";

const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLIST/AppWithRedux',
    component: TaskWithRedux,
    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],

};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

 const TaskWithReduxPresent = () => {
    let task = useSelector<AppRootStateType, TaskType>(state=>state.tasks['todolistId1'][0])
     if (!task) task = {id: v1(), title: 'HTML&CSS', isDone: true}

    return <TaskWithRedux task={task} todolistId={'todolistId1'}/>
}

export const TaskWithReduxStory: Story = {
     render: ()=> <TaskWithReduxPresent/>
}
