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
        { name: 'ball1', type: "Struct", value: -1, members: [
            { name: 'GameObject', type: "Struct", value: -1, members: [
                { name: 'position', type: "Struct", value: -1, members: [
                    { name: 'x', type: "Number", value: 400, members: [] },
                    { name: 'y', type: "Number", value: 300, members: [] },
                ]},
                { name: 'radius', type: "Number", value: 50, members: [] },
            ]},
            { name: 'Rigidbody', type: "Struct", value: -1, members: [
                { name: 'velocity', type: "Struct", value: -1, members: [
                    { name: 'x', type: "Number", value: 0, members: [] },
                    { name: 'y', type: "Number", value: 0, members: [] },
                ]},
                { name: 'mass', type: "Number", value: 200, members: [] },
                { name: 'bounce', type: "Number", value: 0.5, members: [] },
            ]},
        ]},
        { name: 'ball2', type: "Struct", value: -1, members: [
            { name: 'GameObject', type: "Struct", value: -1, members: [
                { name: 'position', type: "Struct", value: -1, members: [
                    { name: 'x', type: "Number", value: 200, members: [] },
                    { name: 'y', type: "Number", value: 200, members: [] },
                ]},
                { name: 'radius', type: "Number", value: 80, members: [] },
            ]},
            { name: 'Rigidbody', type: "Struct", value: -1, members: [
                { name: 'velocity', type: "Struct", value: -1, members: [
                    { name: 'x', type: "Number", value: 4, members: [] },
                    { name: 'y', type: "Number", value: 3, members: [] },
                ]},
                { name: 'mass', type: "Number", value: 100, members: [] },
                { name: 'bounce', type: "Number", value: 0.5, members: [] },
            ]},
        ]},
    ]
};
