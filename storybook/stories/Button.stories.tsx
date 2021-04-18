import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button } from '../../src';
import '../../src/styles/index.less';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    bordered: { control: 'boolean' },
  },
} as Meta;

export const Primary = (args: ButtonProps) => (
  <Button color="primary">Hello</Button>
);

export const ListOfButton = () => (
    <>
        <Button color="primary">Hello</Button>
        <Button color="primary">Hello sdklfjdslkfjsdlkfjsdkfsdfdsfsdf</Button>
        <Button color="primary">Hello sdfsdfsdfsdfsdfsdfsdfsd</Button>
        <Button color="primary">Hello sdfsdfdsfsdfsdfsdfsd</Button>
    </>
)
