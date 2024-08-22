'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

const ContentTabs = () => {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      value: 'categories',
      label: 'Categories',
      icon: <i className='tabler-versions' />
    },
    {
      value: 'prompt',
      label: 'Prompt for AI',
      icon: <i className='tabler-message-2' />
    }
  ]

  const activeTab = tabs.find(tab => pathname === `/content/${tab.value}`)

  return (
    <>
      <TabContext value={activeTab?.value ?? 'categories'}>
        <CustomTabList onChange={(_, value) => router.push(value)} variant='scrollable' pill='true'>
          {tabs.map(tab => (
            <Tab
              key={tab.value}
              icon={tab.icon}
              value={tab.value}
              label={tab.label}
              iconPosition='start'
              component={Link}
              href={`/content/${tab.value}`}
            />
          ))}
        </CustomTabList>
      </TabContext>
    </>
  )
}

export default ContentTabs
