import { useMemo, useCallback, useState, useEffect } from 'react'

// Performance optimization hook for debouncing
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null)

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      const timer = setTimeout(() => callback(...args), delay)
      setDebounceTimer(timer as any)
    },
    [callback, delay, debounceTimer]
  )

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [debounceTimer])

  return debouncedCallback as T
}

// Performance optimization hook for virtual scrolling
export const useVirtualization = (
  items: any[],
  itemHeight: number,
  containerHeight: number
) => {
  return useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight)
    const startIndex = Math.max(0, 0) // This would be dynamic based on scroll position
    const endIndex = Math.min(startIndex + visibleCount, items.length)
    
    return {
      visibleItems: items.slice(startIndex, endIndex),
      startIndex,
      endIndex,
      totalHeight: items.length * itemHeight
    }
  }, [items, itemHeight, containerHeight])
}

// Performance optimization hook for pagination
export const usePagination = <T>(
  items: T[],
  itemsPerPage: number = 10
) => {
  const [currentPage, setCurrentPage] = useState(1)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage)
  }, [items.length, itemsPerPage])

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1)
  }, [currentPage, goToPage])

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage
  }
}

// Performance optimization hook for filtering with memoization
export const useFilteredData = <T extends Record<string, any>>(
  data: T[],
  filters: {
    search?: string
    category?: string
    status?: string
    [key: string]: any
  },
  searchFields: (keyof T)[] = []
) => {
  return useMemo(() => {
    return data.filter(item => {
      // Search filter
      if (filters.search && searchFields.length > 0) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = searchFields.some(field => {
          const fieldValue = item[field]
          return fieldValue && String(fieldValue).toLowerCase().includes(searchLower)
        })
        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.category && item.category !== filters.category) {
        return false
      }

      // Status filter
      if (filters.status && item.status !== filters.status) {
        return false
      }

      // Other filters
      for (const [key, value] of Object.entries(filters)) {
        if (key !== 'search' && key !== 'category' && key !== 'status' && value) {
          if (item[key as keyof T] !== value) {
            return false
          }
        }
      }

      return true
    })
  }, [data, filters, searchFields])
}

// Performance optimization hook for sorting with memoization
export const useSortedData = <T>(
  data: T[],
  sortConfig: {
    key: keyof T
    direction: 'asc' | 'desc'
  } | null
) => {
  return useMemo(() => {
    if (!sortConfig) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])
}
