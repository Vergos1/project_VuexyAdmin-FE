'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'
import type { ReactNode } from 'react'

// Next Imports
// import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'
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

import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import AddNewCategory from '@/components/dialogs/add-edit-category'
import ActionModal from '@/components/dialogs/action-modal'

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

// Column Definitions
const columnHelper = createColumnHelper<UsersTypeWithAction>()

const QuestionListTable = ({ title, tableData }: { title: string; tableData?: any[] }) => {
  //Init
  const router = useRouter()

  // States
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[tableData])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('category', {
        header: '',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography variant='body1'>
              {row.index + 1}. {row.original.text}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: '',
        cell: ({}) => (
          <div className='flex items-center justify-end gap-2 pr-[30px]'>
            <OpenDialogOnElementClick
              element={IconButton}
              elementProps={buttonProps(<i className='tabler-edit' />)}
              dialog={AddNewCategory}
              dialogProps={{
                title: 'Edit Question',
                inputLabel: 'Question',
                placeholder: 'Create question',
                onSubmit: (value: string) => console.log(value)
              }}
            />
            <OpenDialogOnElementClick
              element={IconButton}
              elementProps={buttonProps(<i className='tabler-trash' />)}
              dialog={ActionModal}
              dialogProps={{
                title: 'Delete an item?',
                text: "Are you sure you want to delete this item? You can't undo this action.",
                onSubmit: (value: string) => console.log(value),
                actionText: 'Delete'
              }}
            />
          </div>
        )
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const table = useReactTable({
    data: data as any[],
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

  const buttonProps = (
    children: string | ReactNode,
    color?: ThemeColor,
    variant?: ButtonProps['variant'],
    startIcon?: ReactNode
  ): ButtonProps => ({
    children,
    color,
    variant,
    startIcon
  })

  return (
    <>
      <Card>
        <div className='flex items-center justify-between'>
          <CardHeader title={title} className='p-6' />

          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4 p-6'>
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
            >
              Import CSV
            </Button>
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps('Add Question', 'primary', 'contained', <i className='tabler-plus' />)}
              dialog={AddNewCategory}
              dialogProps={{
                title: 'Create Question',
                inputLabel: 'Question',
                placeholder: 'Create question',
                onSubmit: (value: string) => console.log(value)
              }}
            />
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
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
                      <tr
                        key={row.id}
                        className={
                          (classnames({
                            selected: row.getIsSelected()
                          }),
                          'hover:bg-gray-100')
                        }
                      >
                        {row.getVisibleCells().map((cell, index) => (
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

export default QuestionListTable
