import {EditableSpan} from "./EditableSpan";
import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        oldTitle: {
            description: 'Start value empty. Add value push button set string.'
        },
        onChange: {

            action: 'clicked',
            description: 'Value EditableSpan changed'
        }
    },
    args: {
        oldTitle: "HTML",
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanStory: Story = {
    args: {
        onChange: action('Value EditableSpan changed')
    }
};
