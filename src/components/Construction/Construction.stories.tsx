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
        { name: 'aiueo', content: "() => { return 3; }", floor: 1, num_of_inputs: 0 },
        { name: 'hello', content: "() => { return 2; }", floor: 1, num_of_inputs: 0 },
        { name: 'fooya', content: "(a, b) => { console.log(a + b); }", floor: 2, num_of_inputs: 2 },
        { name: 'yahallo', content: "(a) => { console.log(a); }", floor: 2, num_of_inputs: 1 },
    ]
};
