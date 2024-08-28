'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import TablePagination from '@mui/material/TablePagination'

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

import Link from '@mui/material/Link'

import CustomAvatar from '@core/components/mui/Avatar'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports

import TablePaginationComponent from '@/components/TablePaginationComponent'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { getFullName } from '@/utils/getFullName'
import { getAvatar } from '@/utils/getAvatar'

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

type PostStatusType = {
  [key: string]: ThemeColor
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const postStatusObj: PostStatusType = {
  reviewed: 'success',
  blocked: 'error'
}

// Column Definitions
const columnHelper = createColumnHelper<UsersTypeWithAction>()

const PostListTable = ({ tableData, tableType = 'new' }: { tableData?: any[]; tableType?: 'new' | 'reviewed' }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})

  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('info', {
        header: 'Reported by user',
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
      columnHelper.accessor('post', {
        header: 'Post',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Link underline='hover' href={`/moderation/${tableType}/${row.original.id}`}>
              View post
            </Link>
          </div>
        )
      }),

      ...(tableType === 'reviewed'
        ? [
            columnHelper.accessor('status', {
              header: 'Status',
              cell: ({ row }) => (
                <div className='flex items-center gap-3'>
                  <Chip
                    variant='tonal'
                    label={row.original.status}
                    size='small'
                    color={postStatusObj[row.original.status]}
                    className='capitalize'
                  />
                </div>
              )
            })
          ]
        : [])
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableData]
  )

  const table = useReactTable({
    data: tableData || ([] as any[]),
    columns: columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {},
    enableRowSelection: true, //enable row selection for all rows
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
        <div className='flex items-center justify-start'>
          <CardHeader title='List of complaints' className='p-6' />
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
                          <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows?.length === 0 ? (
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
                      <tr
                        key={row.id}
                        className={
                          (classnames({
                            selected: row.getIsSelected()
                          }),
                          'hover:bg-gray-100')
                        }
                      >
                        {row.getVisibleCells().map(cell => (
                          <td className='hover' key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
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
    </>
  )
}

export default PostListTable
