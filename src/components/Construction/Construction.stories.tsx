import { Story } from '@storybook/react';

import { Construction, ConstructionProps } from './Construction';

export default {
    component: Construction,
    title: 'Construction',
};

const Template: Story<ConstructionProps> = (args) => <Construction {...args} />;

export const Default = Template.bind({});
Default.args = {
    processes: [
        { process_name: 'aiueo', process_content: 'aiueo' },
        { process_name: 'hello', process_content: 'konnichiwa' },
        { process_name: 'fooya', process_content: 'yahallo' },
    ]
};
