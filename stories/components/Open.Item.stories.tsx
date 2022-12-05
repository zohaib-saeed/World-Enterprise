import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Divider, List } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Item } from '../../components/pages/open/dashboard2';
import {  EnterpriseInfo } from '../../store/types';

export default {
  title: 'Components/Open',
  component: Item,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Item>;

export const Open_enterprise_list = () => {
  const enterprisesState: EnterpriseInfo[] = [{
    name: "ABC Coporation",
    logo: "/images/ABC_Logo1.png",
    tokenName: "WEp 1452",
    description: "string",
    isRegisterd: true,
    type: "LLC",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    wepID: "",
  }, {
    name: "ABC Coporation",
    logo: "/images/ABC_Logo2.png",
    tokenName: "WEp 1452",
    description: "string",
    isRegisterd: true,
    type: "LLC",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    wepID: "",
  }
  ]
  return (
    <Grid2
      container
      component="main"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        p: 0,
        mt: 4,
      }}
    >
      <List dense={true} sx={{ width: "100%", pt: 2, px: 0 }}>
        <Divider />
        {enterprisesState.map((enterprise: EnterpriseInfo, idx: number) => {
          return (
            <Item key={idx} avatar={enterprise.logo} title={enterprise.name} content={enterprise.tokenName} onClick={() => {alert("clicked") }} />
          )
        })}
      </List>
    </Grid2>
  )
}