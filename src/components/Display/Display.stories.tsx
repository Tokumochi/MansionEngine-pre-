import { Provider } from 'react-redux';
import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import store from './../../lib/redux/reducers';
import { Display } from './Display';

export default {
    component: Display,
    decorators: [(story: () => React.ReactNode) => <Provider store={store}><BrowserRouter>{story()}</BrowserRouter></Provider>],
    title: 'Display',
};

const Template: Story = (args) => <Display {...args} />;

export const Default = Template.bind({});