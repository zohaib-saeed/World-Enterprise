import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LandingInfo from '../../components/landingInfo';
import { Group } from '@mui/icons-material'

export default {
  title: 'Components/Open',
  component: LandingInfo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof LandingInfo>;


export const LandingInfo_component = () => {
  const params = {
    icon: Group,
    title: "Add a Company",
    content: 'Create a new World Enterprise or Transform your existing company into a World Enterprise',
    sx: {},
    color: "#ff00ff",
  }
  return (
    <LandingInfo
      Icon={params.icon}
      title={params.title}
      content={params.content}
      sx={params.sx}
      color={params.color}
    />
  )
}
