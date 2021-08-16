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
    doors: [
        {id: '1', name: 'test1', kind: "Room", floor: 1, process_string: "() => { return 3; }", x: 2, y: 1, isCorridor: false, stairs: [{lower_id: '2', lower_x: 1, lower_y: 3}, {lower_id: '3', lower_x: 3, lower_y: 3}]},
        {id: '2', name: 'test2', kind: "Data", floor: 1, process_string: "() => { return 2; }", x: 1, y: 3, isCorridor: false, stairs: []},
        {id: '3', name: 'test3', kind: "Process", floor: 2, process_string: "(a, b) => { console.log(a + b); }", x: 3, y: 3, isCorridor: false, stairs: []}
    ],
    room_width: 10,
    room_height: 6,
    select_state: {
        select_kind: "Nothing",
        selected_door_id: '-1',
        selected_stair_index: -1,
    },
};