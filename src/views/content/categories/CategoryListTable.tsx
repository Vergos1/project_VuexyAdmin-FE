'use client'

// React Imports
import type { ReactNode } from 'react'
import { useState, useMemo, useEffect } from 'react'

// Next Imports
// import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import type { ButtonProps } from '@mui/material/Button'
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
import { useDispatch } from 'react-redux'

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
import { setSelectedCategory } from '@/store/slices/categories/categories'
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation
} from '@/store/slices/categories/categoriesApi'

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

// Column Definitions
const columnHelper = createColumnHelper<UsersTypeWithAction>()

const CategoryListTable = ({ tableData }: { tableData?: any[] }) => {
  //Init
  const router = useRouter()
  const dispatch = useDispatch()

  // States
  //   const [addUserOpen, setAddUserOpen] = useState(false)
  const [data, setData] = useState(...[tableData])
  const [rowSelection, setRowSelection] = useState({})

  // const [data, setData] = useState(...[tableData]);
  const [globalFilter, setGlobalFilter] = useState('')

  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const [createCategory] = useCreateCategoryMutation()

  useEffect(() => {
    setData(...[tableData])
  }, [tableData])

  const handleUpdateCategory = async (id: string, name: string, parentCategoryId?: string) => {
    try {
      const response = await updateCategory({ id, name, parentCategoryId }).unwrap()

      console.log('Category updated successfully:', response)
    } catch (error) {
      console.error('Failed to update category:', error)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    console.log('handleDeleteCategory', id)

    try {
      const response = await deleteCategory({ id }).unwrap()

      console.log('Category deleted successfully:', response)
    } catch (error) {
      console.error('Failed to delete category:', error)
    }
  }

  const handleCreateCategory = async (categoryName: string = 'New Category', parentCategoryId?: string) => {
    try {
      const response = await createCategory({ name: categoryName, parentCategoryId }).unwrap()

      console.log('Category created successfully:', response)
    } catch (error) {
      console.error('Failed to create category:', error)
    }
  }

  const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('category', {
        header: '',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography variant='body1'>{row.original.name}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: '',
        cell: ({ row }) => (
          <div onClick={e => e.stopPropagation()} className='flex items-center justify-end gap-2 pr-[30px]'>
            <OpenDialogOnElementClick
              element={IconButton}
              elementProps={buttonProps(<i className='tabler-edit' />)}
              dialog={AddNewCategory}
              dialogProps={{
                title: 'Edit Category',
                inputLabel: 'Category name',
                placeholder: row.original.name || 'Edit category',
                onSubmit: (name: string) => handleUpdateCategory(row.original.id, name, row.original.parentCategoryId)
              }}
            />
            <OpenDialogOnElementClick
              element={IconButton}
              elementProps={buttonProps(<i className='tabler-trash' />)}
              dialog={ActionModal}
              dialogProps={{
                title: 'Delete an item?',
                text: "Are you sure you want to delete this item? You can't undo this action.",
                onSubmit: () => {
                  handleDeleteCategory(row.original.id)
                },
                actionText: 'Delete'
              }}
            />
          </div>
        )
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableData, data]
  )

  const table = useReactTable({
    data: data || ([] as any[]),
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

  const redirectToSubCategory = (category: any) => {
    router.push(`/content/categories/${category.id}/subcategories`)
    dispatch(setSelectedCategory(category))
  }

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
          <CardHeader title='Categories' className='p-6' />

          <div className='p-6'>
            {/* <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => {}}
              className='max-sm:is-full'
            >
              Add Category
            </Button> */}
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps('Add Category', 'primary', 'contained', <i className='tabler-plus' />)}
              dialog={AddNewCategory}
              dialogProps={{
                title: 'Add New Category',
                inputLabel: 'Category Name',
                placeholder: 'Name',
                onSubmit: (name: string) => handleCreateCategory(name)
              }}
            />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
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
                        onClick={() => redirectToSubCategory(row.original)}
                        key={row.id}
                        className={
                          (classnames({
                            selected: row.getIsSelected()
                          }),
                          'hover:bg-gray-100')
                        }
                      >
                        {row.getVisibleCells().map(cell => (
                          <td className='hover cursor-pointer' key={cell.id}>
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

export default CategoryListTable
