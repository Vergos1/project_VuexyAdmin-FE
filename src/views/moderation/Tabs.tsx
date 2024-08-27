'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

const ModerationTabs = () => {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      value: 'new',
      label: 'New'
    },
    {
      value: 'reviewed',
      label: 'Reviewed'
    }
  ]

  const activeTab = tabs.find(tab => pathname === `/moderation/${tab.value}`)

  return (
    <>
      <TabContext value={activeTab?.value ?? 'new'}>
        <CustomTabList onChange={(_, value) => router.push(value)} variant='scrollable' pill='true'>
          {tabs.map(tab => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              iconPosition='start'
              component={Link}
              href={`/moderation/${tab.value}`}
            />
          ))}
        </CustomTabList>
      </TabContext>
    </>
  )
}

export default ModerationTabs
