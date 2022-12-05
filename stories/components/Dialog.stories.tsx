import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import Dialog from '../../components/dialog'; 
import { Button } from '@mui/material';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Dialog>;

export const custom_Dialog: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [opened, setOpened] = useState<boolean>(true)

  return (
    <>
      <Button variant="outlined" onClick={()=> {setOpened(true)}}>
        Open alert dialog
      </Button>

      <Dialog opened={opened} title="Vote on Proposal" ac1="Accept" ac1Click={() => { }} ac1Color="#42B03D" ac2="Reject" ac2Click={() => { }} ac2Color="#FF0000" closeHandler={()=>{setOpened(false)}} />
    </>
  )
}