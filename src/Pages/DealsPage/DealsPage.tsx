import { useState, useMemo } from 'react'
import { Button } from 'react-bootstrap'
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react'
import { 
  PageHeader, 
  SearchFilter, 
  DataTable, 
  StatusBadge,
  CardContainer,
  Tabs,
  Pagination,
  type Column,
  type TabItem
} from '../../components'
import './DealsPage.css'

interface Deal {
  id: string
  name: string
  code: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  status: 'ongoing' | 'upcoming'
}

export const DealsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('category-deals')
  
  const deals: Deal[] = [
    { 
      id: '1', 
      name: 'Big Ramadan Sale', 
      code: 'eg-feb26-brs',
      startDate: '25 Feb 26',
      endDate: '19 Mar 26',
      startTime: '17:00 PM',
      endTime: '22:00 PM',
      status: 'ongoing'
    },
    { 
      id: '2', 
      name: 'Toys Sale', 
      code: 'eg-mar26-toys-sale',
      startDate: '15 Mar 26',
      endDate: '17 Mar 26',
      startTime: '17:00 PM',
      endTime: '22:00 PM',
      status: 'upcoming'
    }
  ]

  const tabs: TabItem[] = useMemo(() => [
    { id: 'my-deals', label: 'My deals' },
    { id: 'category-deals', label: 'Category deals' },
    { id: 'flash-deals', label: 'Flash deals' },
    { id: 'price-drop', label: 'Price drop', badge: 'New', badgeVariant: 'danger' },
    { id: 'commission-drop', label: 'Commission drop', badge: 'New', badgeVariant: 'danger' },
    { id: 'imports', label: 'Imports' }
  ], [])

  const filteredDeals = useMemo(() => deals.filter(deal => 
    deal.name.toLowerCase().includes(searchTerm.toLowerCase())
  ), [deals, searchTerm])

  const columns: Column<Deal>[] = useMemo(() => [
    { 
      key: 'name', 
      header: 'Deal name',
      render: (deal) => (
        <div className="deal-name-cell">
          <span className="deal-title">{deal.name}</span>
          <span className="deal-subtitle">{deal.code}</span>
        </div>
      )
    },
    { 
      key: 'runningDate', 
      header: 'Running date',
      render: (deal) => (
        <div className="running-date-cell">
          <div className="date-row">
            <span>{deal.startDate}</span>
            <ChevronRight size={14} color="#9ca3af" />
            <span>{deal.endDate}</span>
          </div>
          <div className="time-row">
            <span>{deal.startTime}</span>
            <span>{deal.endTime}</span>
          </div>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (deal) => <StatusBadge status={deal.status} />
    },
    { 
      key: 'actions', 
      header: '',
      render: () => <button className="btn-enroll">+ Enroll</button>
    }
  ], [])

  const tabsRightContent = (
    <button className="about-deals-btn">
      <BookOpen size={16} /> About category deals
    </button>
  )

  return (
    <div className="deals-page-container">
      <PageHeader title="Deals" />

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        rightContent={tabsRightContent}
      />

      <SearchFilter
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by deal name..."
        actions={
          <>
            <Button variant="outline-secondary">
              Status <ChevronDown size={16} />
            </Button>
            <Button variant="outline-secondary" disabled>
              Category <ChevronDown size={16} />
            </Button>
          </>
        }
      />

      <CardContainer>
        <DataTable
          data={filteredDeals}
          columns={columns}
          keyExtractor={(deal) => deal.id}
          emptyMessage="No deals found"
          emptyIcon="bi-tag"
        />
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          totalItems={2}
          showInfo
        />
      </CardContainer>

      <div className="rate-page-tab">
        <span className="star-icon">★</span> Rate this page
      </div>
    </div>
  )
}
