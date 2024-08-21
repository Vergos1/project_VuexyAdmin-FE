'use client'

// Component Imports
import CustomTabList from '@/@core/components/mui/TabList'

import { TabContext, TabPanel } from '@mui/lab'
import { ReactElement, SyntheticEvent, useState } from 'react'
import { Grid, Tab } from '@mui/material'
import CategoriesList from './categories/page'
import Prompt from '@/views/content/prompt'

const tabContentList: { [key: string]: ReactElement } = {
  categories: <CategoriesList />,
  pushNotificationsTemplates: <Prompt />
}

const ContentManagement = () => {
  // States
  const [activeTab, setActiveTab] = useState('promptForAI')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <div className='flex flex-col gap-6'>
      <TabContext value={activeTab}>
        <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
          <Tab icon={<i className='tabler-versions' />} value='categories' label='Categories' iconPosition='start' />
          <Tab
            icon={<i className='tabler-message-2' />}
            value='promptForAI'
            label='Prompt for AI'
            iconPosition='start'
          />
          <Tab
            icon={<i className='tabler-bell' />}
            value='pushNotificationsTemplates'
            label='Push notifications templates'
            iconPosition='start'
          />
        </CustomTabList>
        <Grid item xs={12}>
          <TabPanel value={activeTab} className='p-0'>
            {tabContentList[activeTab]}
          </TabPanel>
        </Grid>
      </TabContext>
    </div>
  )
}

export default ContentManagement
