import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { within, userEvent } from '@storybook/testing-library';
import { Landing, DashBoard1, DashBoard2 } from '../../components/pages/open';

export default {
  title: 'Pages/opening',
  component: Landing,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Landing>;

export const landing_page = () => (
  <Landing />
);

export const user_we_dashboard_1 = () => (
  <DashBoard1 />
);

export const user_we_dashboard_2 = () => (
  <DashBoard2 />
);

