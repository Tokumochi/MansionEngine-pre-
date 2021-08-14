import React from 'react';
import { Provider } from 'react-redux';
import { Story } from '@storybook/react';

import store from './../../lib/redux';
import { Display } from './Display';

export default {
    component: Display,
    decorators: [(story: () => React.ReactNode) => <Provider store={store}>{story()}</Provider>],
    title: 'Display',
};

const Template: Story = (args) => <Display {...args} />;

export const Default = Template.bind({});