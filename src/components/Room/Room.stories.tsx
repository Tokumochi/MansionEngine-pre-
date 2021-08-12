import { Story } from '@storybook/react/types-6-0';

import { Room, RoomProps } from './Room';

export default {
    component: Room,
    title: 'Room',
};

const Template: Story<RoomProps> = (args) => <Room {...args} />;

export const Default = Template.bind({});
Default.args = {
    doors: [
        {id: 1, name: 'test1', kind: "Room", floor: 1, process_string: "() => { return 3; }", x: 2, y: 1, isCorridor: false, visitors: [{lower_id: 2, lower_x: 1, lower_y: 3}, {lower_id: 3, lower_x: 3, lower_y: 3}]},
        {id: 2, name: 'test2', kind: "Data", floor: 1, process_string: "() => { return 2; }", x: 1, y: 3, isCorridor: false, visitors: []},
        {id: 3, name: 'test3', kind: "Process", floor: 2, process_string: "(a, b) => { console.log(a + b); }", x: 3, y: 3, isCorridor: false, visitors: []}
    ],
    room_width: 10,
    room_height: 6,
    selected_door_id: -1,
};
