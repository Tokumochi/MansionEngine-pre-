import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Storage, StorageProps } from './Storage';

export default {
    component: Storage,
    decorators: [(story: () => React.ReactNode) =><BrowserRouter>{story()}</BrowserRouter>],
    title: 'Storage',
};

const Template: Story<StorageProps> = (args) => <Storage {...args} />;

export const Default = Template.bind({});
Default.args = {
    datas: [
        { name: 'aiueo', value: 0 },
        { name: 'hello', value: 10 },
        { name: 'fooya', value: 121 },
        { name: 'datadesu', value: -3 },
    ]
};
