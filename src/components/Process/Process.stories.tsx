import { Story } from '@storybook/react/types-6-0';

import { EditProcess, EditProcessProps } from './Process';

export default {
    component: EditProcess,
    title: 'EditProcess',
};

const Template: Story<EditProcessProps> = (args) => <EditProcess {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: '1',
    process_content: 'aiueo',
};

export const Undefined = Template.bind({});
Undefined.args = {
    id: undefined,
    process_content: undefined,
};