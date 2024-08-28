'use client'

import { useState } from 'react'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'
import MemoryListTable from './MemoryListTable'

const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState('new')

  const tabs = [
    {
      value: 'new',
      label: 'News',
      icon: <i className='tabler-versions' />
    },
    {
      value: 'reviewed',
      label: 'Reviewed',
      icon: <i className='tabler-message-2' />
    }
  ]

  const handleTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  const newPostList = [
    {
      id: 1,
      avatar: '',
      firstname: 'John',
      lastname: 'Doe',
      email: '3uSbB@example.com',
      status: 'Reviewed'
    },
    {
      id: 2,
      avatar: '',
      firstname: 'John',
      lastname: 'Doe',
      email: '3uSbB@example.com',
      status: 'Blocked'
    }
  ]

  const reviewedPostList = [
    {
      id: 1,
      avatar: '',
      firstname: 'John',
      lastname: 'Doe',
      email: '3uSbB@example.com',
      status: 'Reviewed'
    },
    {
      id: 2,
      avatar: '',
      firstname: 'John',
      lastname: 'Doe',
      email: '3uSbB@example.com',
      status: 'Reviewed'
    },
    {
      id: 2,
      avatar: '',
      firstname: 'John',
      lastname: 'Doe',
      email: '3uSbB@example.com',
      status: 'Reviewed'
    }
  ]

  return (
    <>
      <TabContext value={activeTab}>
        <CustomTabList onChange={handleTab} variant='scrollable' pill='true'>
          {tabs.map(tab => (
            <Tab key={tab.value} icon={tab.icon} value={tab.value} label={tab.label} iconPosition='start' />
          ))}
        </CustomTabList>
      </TabContext>
      <MemoryListTable tableData={activeTab === 'new' ? newPostList : reviewedPostList} />
    </>
  )
}

export default ContentTabs
