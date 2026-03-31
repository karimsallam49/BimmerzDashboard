
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/hooks'
import { AppLayout } from '../Component/AppLayout/AppLayout'
import { LoginPage } from '../Pages/LoginPage/LoginPage'
import { DashboardPage } from '../Pages/DashboardPage'
import { AddProductPage } from '../Pages/AddProductPage/AddProductPage'
import { AddByCatalogPage } from '../Pages/AddByCatalogPage/AddByCatalogPage'
import { CatalogPage } from '../Pages/CatalogPage/CatalogPage'
import { InventoryPage } from '../Pages/InventoryPage/InventoryPage'
import { PricingPage } from '../Pages/PricingPage/PricingPage'
import { OrdersPage } from '../Pages/OrdersPage/OrdersPage'
import { AdvertisingPage } from '../Pages/AdvertisingPage/AdvertisingPage'
import { StoresPage } from '../Pages/StoresPage/StoresPage'
import { GrowthPage } from '../Pages/GrowthPage/GrowthPage'
import { ReportsPage } from '../Pages/ReportsPage/ReportsPage'
import { PaymentsPage } from '../Pages/PaymentsPage/PaymentsPage'
import { PerformancePage } from '../Pages/PerformancePage/PerformancePage'
import { AppsServicesPage } from '../Pages/AppsServicesPage/AppsServicesPage'
import { BrandsPage } from '../Pages/BrandsPage/BrandsPage'
import { LearnPage } from '../Pages/LearnPage/LearnPage'
import { ProductListPage } from '../Pages/ProductListPage/ProductListPage'
import { MyCatalogPage } from '../Pages/MyCatalogPage/MyCatalogPage'
import { ImportsPage } from '../Pages/ImportsPage/ImportsPage'
import { ExportsPage } from '../Pages/ExportsPage/ExportsPage'
import { BimmerzCatalogPage } from '../Pages/BimmerzCatalogPage/BimmerzCatalogPage'
import { BrandCatalogPage } from '../Pages/BrandCatalogPage/BrandCatalogPage'
import { MyBrandsPage } from '../Pages/MyBrandsPage/MyBrandsPage'
import { AddFbnProductPage } from '../Pages/AddFbnProductPage/AddFbnProductPage'
import { FbnInventoryPage } from '../Pages/FbnInventoryPage/FbnInventoryPage'
import { PromotionsPage } from '../Pages/PromotionsPage/PromotionsPage'
import { DealsPage } from '../Pages/DealsPage/DealsPage'
import { VireulaBundlesPage } from '../Pages/VireulaBundlesPage/VireulaBundlesPage'
import { CouponsPage } from '../Pages/CouponsPage/CouponsPage'
import { DirectshipPage } from '../Pages/DirectshipPage/DirectshipPage'
import { StatementsPage } from '../Pages/StatementsPage/StatementsPage'
import { TransactionViewPage } from '../Pages/TransactionViewPage/TransactionViewPage'
import { AddNewProductPage } from '../Pages/AddNewProductPage/AddNewProductPage'
import { CatalogProductsPage } from '../Pages/CatalogProductsPage/CatalogProductsPage'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth)
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

export const AppRouter = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />
      }
    ]
  },
  {
    path: '/Product-List',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CatalogPage />
      }
    ]
  },
  {
    path: '/inventory',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <InventoryPage />
      }
    ]
  },
  {
    path: '/pricing',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PricingPage />
      }
    ]
  },
  {
    path: '/add-product',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AddProductPage />
      }
    ]
  },
  {
    path: '/add-by-catalog',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AddByCatalogPage />
      }
    ]
  },
  {
    path: '/catalog/products',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CatalogProductsPage />
      }
    ]
  },
  {
    path: '/orders',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <OrdersPage />
      }
    ]
  },
  {
    path: '/advertising',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdvertisingPage />
      }
    ]
  },
  {
    path: '/stores',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <StoresPage />
      }
    ]
  },
  {
    path: '/growth',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <GrowthPage />
      }
    ]
  },
  {
    path: '/reports',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ReportsPage />
      }
    ]
  },
  {
    path: '/payments',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PaymentsPage />
      }
    ]
  },
  {
    path: '/performance',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PerformancePage />
      }
    ]
  },
  {
    path: '/apps-services',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AppsServicesPage />
      }
    ]
  },
  {
    path: '/brands',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <BrandsPage />
      }
    ]
  },
  {
    path: '/learn',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <LearnPage />
      }
    ]
  },
  {
    path: '/catalog',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ProductListPage />
      }
    ]
  },
  {
    path: '/my-catalog',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MyCatalogPage />
      }
    ]
  },
  {
    path: '/imports',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ImportsPage />
      }
    ]
  },
  {
    path: '/exports',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ExportsPage />
      }
    ]
  },
  {
    path: '/bimmerz-catalog',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <BimmerzCatalogPage />
      }
    ]
  },
  {
    path: '/brand-catalog',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <BrandCatalogPage />
      }
    ]
  },
  {
    path: '/my-brands',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MyBrandsPage />
      }
    ]
  },
  {
    path: '/add-fbn-product',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AddFbnProductPage />
      }
    ]
  },
  {
    path: '/fbn-inventory',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <FbnInventoryPage />
      }
    ]
  },
  {
    path: '/promotions',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PromotionsPage />
      }
    ]
  },
  {
    path: '/deals',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DealsPage />
      }
    ]
  },
  {
    path: '/vireula-bundles',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <VireulaBundlesPage />
      }
    ]
  },
  {
    path: '/coupons',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CouponsPage />
      }
    ]
  },
  {
    path: '/directship',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DirectshipPage />
      }
    ]
  },
  {
    path: '/add-new-product',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AddNewProductPage />
      }
    ]
  },
  {
    path: '/statements',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <StatementsPage />
      }
    ]
  },
  {
    path: '/transaction-view',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TransactionViewPage />
      }
    ]
  }
])
