import { Story } from '@storybook/react/types-6-0';
import { BrowserRouter } from 'react-router-dom';
import { DoorState } from '../../lib/redux/states';

import { Room, RoomProps } from './Room';

export default {
    component: Room,
    decorators: [(story: () => React.ReactNode) =><BrowserRouter>{story()}</BrowserRouter>],
    title: 'Room',
};

const Template: Story<RoomProps> = (args) => <Room {...args} />;

const door1: DoorState = {id: '1', name: 'test1', kind: "Process", x: 230, y: 300, floor: 1, ref_name: 'return3', isCorridor: false, stairs: [], num_of_output: 1};
const door2: DoorState = {id: '2', name: 'test2', kind: "Process", x: 400, y: 550, floor: 1, ref_name: 'return2', isCorridor: false, stairs: [], num_of_output: 2};
const door3: DoorState = {id: '3', name: 'test3', kind: "Process", x: 300, y: 100, floor: 2, ref_name: 'output_a_plus_b', isCorridor: false, stairs: [{lower_door: door1, lower_index: 0}, {lower_door: door2, lower_index: 1}], num_of_output: 3};
const door4: DoorState = {id: '4', name: 'test4', kind: "Process", x: 500, y: 400, floor: 3, ref_name: 'output_a', isCorridor: false, stairs: [], num_of_output: 0};
const door5: DoorState = {id: '5', name: 'test5', kind: "Data", x: 600, y: 200, floor: 1, ref_name: '3', isCorridor: false, stairs: [], num_of_output: 1};
const door6: DoorState = {id: '6', name: 'test6', kind: "Data", x: 800, y: 400, floor: 1, ref_name: '2', isCorridor: false, stairs: [], num_of_output: 1};

export const Default = Template.bind({});
Default.args = {
    rooms: [{
        id: '1',
        name: "test",
        doors: [
            door1,
            door2,
            door3,
            door4,
            door5,
            door6
        ],
        room_width: 4000,
        room_height: 2000,
        children: [],
    }],
    selector: {
        selecting_kind: "Nothing",
        selecting_name: "",
        selecting_id: "-1",
        selecting_index: -1,
        selecting_process: { name: '', content: "", floor: -1, inputs: [], outputs: [] },
    }
};
