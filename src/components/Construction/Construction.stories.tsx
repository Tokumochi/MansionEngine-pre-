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
        { name: 'aiueo', content: "() => { return 3; }", },
        { name: 'hello', content: "() => { return 2; }", },
        { name: 'fooya', content: "(a, b) => { console.log(a + b); }", },
        { name: 'yahallo', content: "(a) => { console.log(a); }" },
    ]
};
