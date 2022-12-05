import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CreateAppBar } from '../../components/Appbar'; 

export default {
  title: 'Components/Create',
  component: CreateAppBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CreateAppBar>;

export const Open_CreateAppBar = () => {
  const title = "CreateAppBar"
  const close = () => { }
  const helpEnabled = true

  return (
    <CreateAppBar title={title} close={close} helpEnabled={helpEnabled} />
  )
}