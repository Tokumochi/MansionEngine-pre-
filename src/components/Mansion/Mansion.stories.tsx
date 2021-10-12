import { Provider } from 'react-redux';
import { Story } from '@storybook/react';

import store from './../../lib/redux/reducers';
import Mansion from './Mansion';

export default {
    component: Mansion,
    decorators: [(story: () => React.ReactNode) => <Provider store={store}>{story()}</Provider>],
    title: 'Mansion',
};

const Template: Story = (args) => <Mansion {...args} />;

export const Default = Template.bind({});