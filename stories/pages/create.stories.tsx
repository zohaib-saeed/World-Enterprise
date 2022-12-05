import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { within, userEvent } from '@storybook/testing-library';
import { Confirm, Final } from '../../components/pages/create';
import { EnterpriseCreate, EnterpriseReview } from '../../components/pages/enterprise';
import { AdminAdd, AdminsView } from '../../components/pages/admins';
import { ShareholderAdd, ShareholdersView } from '../../components/pages/shareholders';

export default {
  title: 'Pages/create',
  component: EnterpriseCreate,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof EnterpriseCreate>;

export const WE_enterprise_create = () => {
  return (
    <EnterpriseCreate />
  )
}

export const WE_enterprise_review = () => {
  return (
    <EnterpriseReview />
  )
}

export const WE_shareholders_view = () => {
  return (
    <ShareholdersView/>
  )
}

export const WE_shareholders_add = () => {
  return (
    <ShareholderAdd/>
  )
}

export const WE_admins_view = () => {
  return (
    <AdminsView/>
  )
}

export const WE_admins_add = () => {
  return (
    <AdminAdd/>
  )
}

export const WE_confirm_create = () => {
  return (
    <Confirm/>
  )
}

export const WE_final_create = () => {
  return (
    <Final/>
  )
}