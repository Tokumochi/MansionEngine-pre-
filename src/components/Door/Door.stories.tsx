import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Door, DoorProps } from './Door';

export default {
    component: Door,
    decorators: [(story: () => React.ReactNode) =><BrowserRouter><svg version="1.1" width={4000} height={2000}>{story()}</svg></BrowserRouter>],
    title: 'Door',
};

const Template: Story<DoorProps> = (args) => <Door {...args} />;

export const Process = Template.bind({});
Process.args = {
    door: {id: '1', name: 'process', kind: "Process", floor: 2, ref_name: "", x: 300, y: 300, isCorridor: false, stairs: []},
    selector: {
        selecting_kind: "Nothing",
        selecting_name: "",
        selecting_id: "-1",
        selecting_index: -1,
        selecting_process: { name: '', content: "", floor: -1, num_of_inputs: 0 },
    }
};
export const Data = Template.bind({});
Data.args = {
    door: {id: '2', name: 'data', kind: "Data", floor: 2, ref_name: "", x: 600, y: 300, isCorridor: false, stairs: []},
    selector: {
        selecting_kind: "Door",
        selecting_name: "",
        selecting_id: "2",
        selecting_index: -1,
        selecting_process: { name: '', content: "", floor: -1, num_of_inputs: 0 },
    }
};
export const Room = Template.bind({});
Room.args = {
    door: {id: '3', name: 'room', kind: "Room", floor: 2, ref_name: "", x: 300, y: 300, isCorridor: false, stairs: []},
    selector: {
        selecting_kind: "Nothing",
        selecting_name: "",
        selecting_id: "-1",
        selecting_index: -1,
        selecting_process: { name: '', content: "", floor: -1, num_of_inputs: 0 },
    }
};
