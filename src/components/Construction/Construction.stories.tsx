import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Construction, ConstructionProps } from './Construction';

export default {
    component: Construction,
    decorators: [(story: () => React.ReactNode) =><BrowserRouter>{story()}</BrowserRouter>],
    title: 'Construction',
};

const Template: Story<ConstructionProps> = (args) => <Construction {...args} />;

export const Default = Template.bind({});
Default.args = {
    processes: [
        { name: 'aiueo', content: "a = 3;", inputs: [], outputs: [{name: "a", type: "Number"}], floor: 1 },
        { name: 'hello', content: "b = 2;", inputs: [], outputs: [{name: "b", type: "Number"}], floor: 1 },
        { name: 'fooya', content: "console.log(a + b);", inputs: [{name: "a", type: "Number"}, {name: "b", type: "Number"}], outputs: [], floor: 2 },
        { name: 'yahallo', content: "console.log(a);", inputs: [{name: "a", type: "Number"}], outputs: [], floor: 2 },
    ]
};
