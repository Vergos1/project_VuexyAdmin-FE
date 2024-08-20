'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent, ReactElement } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

const ContentTabs = () => {
  // States
  const [activeTab, setActiveTab] = useState('overview')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <>
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
      </TabContext>
    </>
  )
}

export default ContentTabs
