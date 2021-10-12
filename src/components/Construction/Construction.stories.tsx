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
        { name: 'aiueo', content: "a = 3;", inputs: [], outputs: [{name: "a"}], floor: 1 },
        { name: 'hello', content: "b = 2;", inputs: [], outputs: [{name: "b"}], floor: 1 },
        { name: 'fooya', content: "console.log(a + b);", inputs: [{name: "a"}, {name: "b"}], outputs: [], floor: 2 },
        { name: 'yahallo', content: "console.log(a);", inputs: [{name: "a"}], outputs: [], floor: 2 },
    ]
};
