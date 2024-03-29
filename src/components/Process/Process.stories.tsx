import { Story } from '@storybook/react/types-6-0';

import { EditProcess, EditProcessProps } from './Process';

export default {
    component: EditProcess,
    title: 'EditProcess',
};

const Template: Story<EditProcessProps> = (args) => <EditProcess {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: '1',
    content: 'aiueo',
};

export const Undefined = Template.bind({});
Undefined.args = {
    name: undefined,
    content: undefined,
};