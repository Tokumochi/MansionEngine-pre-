import { Provider } from 'react-redux';
import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import store from './../../lib/redux/reducers';
import { Sidebar } from './Sidebar';

export default {
    component: Sidebar,
    decorators: [(story: () => React.ReactNode) => <Provider store={store}><BrowserRouter>{story()}</BrowserRouter></Provider>],
    title: 'Sidebar',
};

const Template: Story = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});