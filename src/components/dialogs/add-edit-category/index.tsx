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

type AddEditCategoryProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  placeholder?: string;
  inputLabel?: string;
  onSubmit: (value: string) => void;
  submitText?: string;
  cancelText?: string;
};

const AddEditCategory = ({
  open,
  setOpen,
  title,
  placeholder,
  inputLabel,
  onSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
}: AddEditCategoryProps) => {
  // States
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={() => setOpen(false)}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', maxWidth: '600px', width: '100%' } }}>
      <DialogTitle
        variant='h4'
        className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {title}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className='pbs-0 sm:pli-16'>
          <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
            <i className='tabler-x' />
          </DialogCloseButton>
          <CustomTextField
            fullWidth
            label={inputLabel}
            name='input'
            variant='outlined'
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit'>
            {submitText}
          </Button>
          <Button
            variant='tonal'
            color='secondary'
            onClick={() => {
              setOpen(false);
            }}
            type='reset'>
            {cancelText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEditCategory;
