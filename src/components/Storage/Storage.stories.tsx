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
        { id: '1', name: 'ball1', type: "Struct", value: -1, members: [
            { id: '11', name: 'GameObject', type: "Struct", value: -1, members: [
                { id: '111', name: 'position', type: "Struct", value: -1, members: [
                    { id: '1111', name: 'x', type: "Number", value: 400, members: [] },
                    { id: '1112', name: 'y', type: "Number", value: 300, members: [] },
                ]},
                { id: '112', name: 'radius', type: "Number", value: 50, members: [] },
            ]},
            { id: '12', name: 'Rigidbody', type: "Struct", value: -1, members: [
                { id: '121', name: 'velocity', type: "Struct", value: -1, members: [
                    { id: '1211', name: 'x', type: "Number", value: 0, members: [] },
                    { id: '1212', name: 'y', type: "Number", value: 0, members: [] },
                ]},
                { id: '122', name: 'mass', type: "Number", value: 200, members: [] },
                { id: '123', name: 'bounce', type: "Number", value: 0.5, members: [] },
            ]},
        ]},
        { id: '2', name: 'ball2', type: "Struct", value: -1, members: [
            { id: '21', name: 'GameObject', type: "Struct", value: -1, members: [
                { id: '211', name: 'position', type: "Struct", value: -1, members: [
                    { id: '2111', name: 'x', type: "Number", value: 200, members: [] },
                    { id: '2112', name: 'y', type: "Number", value: 200, members: [] },
                ]},
                { id: '212', name: 'radius', type: "Number", value: 80, members: [] },
            ]},
            { id: '22', name: 'Rigidbody', type: "Struct", value: -1, members: [
                { id: '221', name: 'velocity', type: "Struct", value: -1, members: [
                    { id: '2211', name: 'x', type: "Number", value: 4, members: [] },
                    { id: '2212', name: 'y', type: "Number", value: 3, members: [] },
                ]},
                { id: '222', name: 'mass', type: "Number", value: 100, members: [] },
                { id: '223', name: 'bounce', type: "Number", value: 0.5, members: [] },
            ]},
        ]},
    ]
};
