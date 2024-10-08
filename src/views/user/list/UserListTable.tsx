'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
// import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import TableFilters from './TableFilters'

import UserInfoDrawer from './UserInfoDrawer'

import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { getFullName } from '@/utils/getFullName'
import {
  useChangeUserStatusByIdMutation,
  useGetUsersListCSVQuery,
  useLazyGetUserInfoByIdQuery,
  useLazyGetUsersQuery
} from '@/store/slices/userManagement/userManagementApi'
import { getAvatar } from '@/utils/getAvatar'
import type { MetaType, UsersListType } from '@/types/userTypes'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type UsersTypeWithAction = any & {
  action?: string
}

type UserRoleType = {
  [key: string]: { icon: string }
}

type UserStatusType = {
  [key: string]: ThemeColor
}

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const firstName = row.original.firstName
  const lastName = row.original.lastName
  const email = row.original.email

  const firstNameRank = rankItem(firstName, value)
  const lastNameRank = rankItem(lastName, value)
  const emailRank = rankItem(email, value)

  if (firstNameRank.passed || lastNameRank.passed || emailRank.passed) {
    return true
  }

  return false
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'tabler-crown' },
  user: { icon: 'tabler-user' }
}

const userStatusObj: UserStatusType = {
  active: 'success',
  unverified: 'warning',
  blocked: 'error'
}

// Column Definitions
const columnHelper = createColumnHelper<UsersTypeWithAction>()

interface UsersListTableProps {
  tableData: UsersListType[] | []
  meta: MetaType | {}
}

const UserListTable = ({ tableData, meta }: UsersListTableProps) => {
  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[tableData])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [category, setCategory] = useState<any['category']>([])
  const [subscriptionType, setSubscriptionType] = useState<any['currentPlan']>('')
  const [status, setStatus] = useState<any['status']>('')
  const [favoritesFilter, setFavoritesFilter] = useState<any>('')

  const [filters, setFilters] = useState({
    subscriptionType: '',
    status: '',
    category: [],
    favoritesFilter: ''
  })

  //   const [filters, setFilters] = useState({
  //     page: 1,
  //     limit: 10,
  //     subscriptionType: subscriptionType,
  //     favoritesFilter: favoritesFilter,
  //     categories: category,
  //     status: status
  //   })

  // Queries
  const [getUserInfoById, { data: userInfo, isLoading: isUserInfoLoading }] = useLazyGetUserInfoByIdQuery()
  const [getUsers, { isLoading: isUsersLoading }] = useLazyGetUsersQuery()
  const [changeUserStatusById] = useChangeUserStatusByIdMutation()
  const { data: csvData, error: csvError } = useGetUsersListCSVQuery(filters)

  useEffect(() => {
    setData(...[tableData])
  }, [tableData])

  // Handlers
  const csvUrl = csvData ? URL.createObjectURL(new Blob([csvData], { type: 'text/csv' })) : ''

  const handleChangeUserStatus = async (id: string) => {
    try {
      await changeUserStatusById(id).unwrap()
    } catch (error) {
      console.error('Failed to block user:', error)
    }
  }

  const handleUserDetailsClick = (id: string) => {
    setSelectedUserId(id)
    setAddUserOpen(true)
    getUserInfoById(id) //? Викликаємо запит для отримання даних користувача
  }

  const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('info', {
        header: 'User',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({
              avatar: row.original.avatar,
              firstName: row.original.firstName,
              lastName: row.original.lastName
            })}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {getFullName(row.original.firstName, row.original.lastName)}
              </Typography>
              <Typography variant='body2'>{row.original.email}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('role', {
        header: 'Role',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Icon className={userRoleObj[row.original.role].icon} />
            <Typography className='capitalize' color='text.primary'>
              {row.original.role}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('subscriptionType', {
        header: 'Plan',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.subscriptionType === 'free' && 'Moments'}
            {row.original.subscriptionType === 'monthly' && 'Moments Deluxe (Monthly)'}
            {row.original.subscriptionType === 'annual' && 'Moments Deluxe (Annual)'}
          </Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              label={row.original.status}
              size='small'
              color={userStatusObj[row.original.status]}
              className='capitalize'
            />
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            {/* <IconButton onClick={() => setData(data?.filter(product => product.id !== row.original.id))}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton> */}
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'User details',
                  icon: 'tabler-info-circle',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' },
                  onClick: () => handleUserDetailsClick(row.original.id) //?? Передаємо ID користувача
                },
                {
                  text: row.original.status === 'blocked' ? 'Unblock user' : 'Block user',
                  icon: row.original.status === 'blocked' ? 'tabler-circle-check' : 'tabler-circle-x',
                  menuItemProps: {
                    className: `flex items-center gap-2 ${row.original.status === 'blocked' ? 'text-success' : 'text-error'}`
                  },
                  onClick: () => handleChangeUserStatus(row.original.id)
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <CardHeader title='User List' className='pbe-4' />
        <TableFilters setData={setFilteredData} setFilters={setFilters} />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search User'
              className='max-sm:is-full'
            />
            <Button
              color='primary'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='max-sm:is-full'
              component='a'
              href={csvUrl}
              download='users.csv'
              disabled={!csvData}
            >
              Export to CSV
            </Button>
            {/* <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddUserOpen(!addUserOpen)}
              className='max-sm:is-full'
            >
              Add New User
            </Button> */}
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      <UserInfoDrawer
        isLoading={isUserInfoLoading}
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        userData={userInfo}
        setData={setData}
      />
    </>
  )
}

export default UserListTable
