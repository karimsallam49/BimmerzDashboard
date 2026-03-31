import React from 'react'
import { Table } from 'react-bootstrap'

interface OptimizedTableProps<T> {
  data: T[]
  columns: {
    key: keyof T
    label: string
    render?: (value: any, item: T) => React.ReactNode
  }[]
  loading?: boolean
  emptyMessage?: string
}

export const OptimizedTable = <T,>({ 
  data, 
  columns, 
  loading = false, 
  emptyMessage = "No data available" 
}: OptimizedTableProps<T>) => {
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <Table responsive hover striped>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={String(column.key)}>
                {column.render ? column.render(item[column.key], item) : String(item[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

interface TableRowProps<T> {
  item: T
  columns: {
    key: keyof T
    label: string
    render?: (value: any, item: T) => React.ReactNode
  }[]
}

export const MemoizedTableRow = function <T>({ item, columns }: TableRowProps<T>) {
  return (
    <>
      {columns.map((column) => (
        <td key={String(column.key)}>
          {column.render ? column.render(item[column.key], item) : String(item[column.key])}
        </td>
      ))}
    </>
  )
}

MemoizedTableRow.displayName = 'MemoizedTableRow'
