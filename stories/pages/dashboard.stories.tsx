import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { within, userEvent } from '@storybook/testing-library';
import Dashboard from '../../pages/[wepID]/dashboard';
import Receive from '../../pages/[wepID]/receive';
import Send from '../../pages/[wepID]/send';
import Transactions from '../../pages/[wepID]/transactions';
import Settings from '../../pages/[wepID]/setting';

export default {
  title: 'Pages/dashboard',
  component: Dashboard,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Dashboard>;

export const dashboard_final = () => (
  <Dashboard />
);

export const receive = () => (
  <Receive />
);

export const send = () => (
  <Send />
);

export const transactions = () => (
  <Transactions />
);

export const settings = () => (
  <Settings/>
);