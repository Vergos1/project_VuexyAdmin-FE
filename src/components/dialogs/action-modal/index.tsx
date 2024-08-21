'use client';

// React Imports
import { ReactNode, useState } from 'react';

// MUI Imports
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// Component Imports
import CustomTextField from '@/@core/components/mui/TextField';
import DialogCloseButton from '../DialogCloseButton';
import { Typography } from '@mui/material';

type ActionModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  text: string;
  onSubmit: (value: string) => void;
  actionText?: string;
  cancelText?: string;
};

const ActionModal = ({
  open,
  setOpen,
  title,
  text,
  onSubmit,
  actionText = 'Yes',
  cancelText = 'Close',
}: ActionModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(inputValue);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={() => setOpen(false)}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', maxWidth: '600px', width: '100%' } }}>
      <DialogTitle variant='h5' className='flex gap-2 flex-col text-left p-6'>
        {title}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className='pbs-0 sm:pli-6'>
          <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
            <i className='tabler-x' />
          </DialogCloseButton>
          <Typography variant='body1'>
            {text}
          </Typography>
        </DialogContent>
        <DialogActions className='justify-end'>
          <Button
            variant='tonal'
            color='secondary'
            onClick={() => {
              setOpen(false);
            }}
            type='reset'>
            {cancelText}
          </Button>
          <Button variant='contained' type='submit'>
            {actionText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ActionModal;
