import React from 'react';
import { Table } from 'react-bootstrap';
import './DataTable.css';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (selectedKeys: string[]) => void;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  emptyIcon?: string;
  loading?: boolean;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  onRowClick,
  emptyMessage = 'No data found',
  emptyIcon = 'bi-box',
  loading = false,
  className = ''
}: DataTableProps<T>) {
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onSelectionChange?.(data.map(keyExtractor));
    } else {
      onSelectionChange?.([]);
    }
  };

  const handleSelectItem = (key: string, checked: boolean) => {
    if (checked) {
      onSelectionChange?.([...selectedKeys, key]);
    } else {
      onSelectionChange?.(selectedKeys.filter((k) => k !== key));
    }
  };

  const allSelected = data.length > 0 && selectedKeys.length === data.length;
  const someSelected = selectedKeys.length > 0 && selectedKeys.length < data.length;

  if (loading) {
    return (
      <div className="data-table-loading text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <div className={`data-table-container ${className}`}>
      <Table responsive hover className="data-table">
        <thead>
          <tr>
            {selectable && (
              <th className="select-column">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width, textAlign: col.align }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const itemKey = keyExtractor(item);
            return (
              <tr 
                key={itemKey} 
                onClick={() => onRowClick?.(item)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {selectable && (
                  <td className="select-column" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedKeys.includes(itemKey)}
                      onChange={(e) => handleSelectItem(itemKey, e.target.checked)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{ textAlign: col.align }}
                  >
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>

      {data.length === 0 && (
        <div className="empty-state text-center py-5">
          <i className={`bi ${emptyIcon} display-4 text-muted`}></i>
          <p className="text-muted mt-2">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}
