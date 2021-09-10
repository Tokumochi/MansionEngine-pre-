import { Story } from '@storybook/react/types-6-0';
import { BrowserRouter } from 'react-router-dom';

import { Room, RoomProps } from './Room';

export default {
    component: Room,
    decorators: [(story: () => React.ReactNode) =><BrowserRouter>{story()}</BrowserRouter>],
    title: 'Room',
};

const Template: Story<RoomProps> = (args) => <Room {...args} />;

export const Default = Template.bind({});
Default.args = {
    room: {
        doors: [
            {id: '1', name: 'test1', kind: "Process", x: 2, y: 3, floor: 1, process_name: 'return3', isCorridor: false, stairs: []},
            {id: '2', name: 'test2', kind: "Process", x: 4, y: 3, floor: 1, process_name: 'return2', isCorridor: false, stairs: []},
            {id: '3', name: 'test3', kind: "Process", x: 3, y: 1, floor: 2, process_name: 'output_a_plus_b', isCorridor: false, stairs: [{lower_id: '1', lower_x: 2, lower_y: 3}, {lower_id: '2', lower_x: 4, lower_y: 3}]},
            {id: '4', name: 'test4', kind: "Process", x: 1, y: 1, floor: 3, process_name: 'output_a', isCorridor: false, stairs: [{lower_id: '-1', lower_x: -1, lower_y: -1}]},
        ],
        room_width: 10,
        room_height: 6,
    },
    selector: {
        selecting_kind: "Nothing",
        selecting_name: "",
        selecting_id: "-1",
        selecting_index: -1,
        selecting_process: { name: '', content: "", floor: -1, num_of_inputs: 0 },
    }
};
