import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Door, DoorProps } from './Door';

export default {
    component: Door,
    decorators: [(story: () => React.ReactNode) =><BrowserRouter><svg version="1.1" width={600} height={300}>{story()}</svg></BrowserRouter>],
    title: 'Door',
};

const Template: Story<DoorProps> = (args) => <Door {...args} />;

export const Default = Template.bind({});
Default.args = {
    door: {id: '1', name: 'test', kind: "Room", floor: 2, process_name: "", x: 0, y: 0, isCorridor: false, stairs: []},
    selector: {
        selecting_kind: "Nothing",
        selecting_name: "",
        selecting_id: "-1",
        selecting_index: -1,
    }
};
