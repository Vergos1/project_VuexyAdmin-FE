'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// Type Import
import type { CustomInputVerticalData } from '@core/components/custom-inputs/types'

// Component Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@/@core/components/mui/TextField'

type AddNewCategoryProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

const AddNewCategory = ({ open, setOpen }: AddNewCategoryProps) => {
  // States
  const [categoryName, setCategoryName] = useState<string>('')

  return (
    <Dialog
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={() => {
        setOpen(false)
      }}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', maxWidth: '600px', width: '100%' } }}
    >
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add New Category
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='pbs-0 sm:pli-16'>
          <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
            <i className='tabler-x' />
          </DialogCloseButton>
          <CustomTextField
            fullWidth
            label='Category'
            name='name'
            variant='outlined'
            placeholder='Name'
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={() => setOpen(false)} type='submit'>
            Submit
          </Button>
          <Button
            variant='tonal'
            color='secondary'
            onClick={() => {
              setOpen(false)
            }}
            type='reset'
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddNewCategory
