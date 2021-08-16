import { Provider } from 'react-redux';
import { Story } from '@storybook/react';

import store from './../../lib/redux/reducers';
import { Screen } from './Screen';

export default {
    component: Screen,
    decorators: [(story: () => React.ReactNode) => <Provider store={store}>{story()}</Provider>],
    title: 'Screen',
};

const Template: Story = (args) => <Screen {...args} />;

export const Default = Template.bind({});