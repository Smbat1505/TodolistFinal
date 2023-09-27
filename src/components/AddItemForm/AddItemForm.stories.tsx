import type {Meta, StoryObj} from '@storybook/react';

import AddItemForm, {AddItemFormPropsType} from "./AddItemForm";
import {Button} from "../Button/Button";
import {ChangeEvent, useState, KeyboardEvent} from "react";
import {Input} from "../Input/Input";
import {action} from "@storybook/addon-actions"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: {action: 'clicked', description: 'Button clicked inside form'},
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AddItemFormStory: Story = {};

const AddItemFormWithError = (props: AddItemFormPropsType) => {
    const [valueTitle, setValueTitle] = useState('');
    const [error, setError] = useState<string | null>('Title is required!!!');

    function handleAddTask() {
        if (valueTitle.trim() !== '') {
            props.callback(valueTitle.trim())
            setValueTitle('')
        } else {
            setError('Title is required!!!')
        }
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setValueTitle(e.currentTarget.value)
    }

    function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (error) setError(null)
        if (e.key === 'Enter') {
            handleAddTask()
        }
    }

    return (
        <div>
            <Input
                value={valueTitle}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                className={error ? 'error' : 'error-message'}

            />
            <Button
                name={'+ add'}
                callback={handleAddTask}
                className={'add-button'}
            />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )

}
export const AddItemFormWithErrorStory: Story = {
    render: (args) => {
        return <AddItemFormWithError callback={action('Title is required!!!')}/>;
    }
};
