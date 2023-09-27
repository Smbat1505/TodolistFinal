import type {Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions"
import {Task} from "./Task";
import {ChangeEvent, useState} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        updateTask: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', isDone: true},
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: '43423', isDone: false, title: 'HTML'}
    }
};

const TaskPresentation = () => {
    const [task, setTask] = useState({id: 'root', isDone: false, title: 'JS'})
    return (
        <Task
            task={task}
            updateTask={
                ( _, title) => {
                    setTask({...task, title: title})
                }
            }
            changeTaskStatus={
                () => {
                    setTask({...task, isDone: !task.isDone})
                }
            }
            removeTask={action('removeTask')}
        />
    )
}

export const TaskPresentationStory: Story = {
    render: () => <TaskPresentation/>
}