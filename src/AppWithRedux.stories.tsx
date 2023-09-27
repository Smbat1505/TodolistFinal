import type {Meta, StoryObj} from '@storybook/react';
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import {Provider} from "react-redux";
import {store} from "./reducers/store";

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {}
