export const APIBaseURl = import.meta.env.VITE_APP_URL;

export const LoginEndpoint = `${APIBaseURl}/api/supplier/login`;

export const VendorProductsEndpoint = `${APIBaseURl}/api/vendors/product-by-vendor`;
export const AddNewProductEndpoint = `${APIBaseURl}/api/vendors/product-by-vendor/storeNewProduct`;
export const VendorProductsStoreEndpoint = `${APIBaseURl}/api/vendors/product-by-vendor/store`;
export const GetAllwarranties = `${APIBaseURl}/api/vendors/product-by-vendor/warranties`;
export const GetCarByModelsAPi = (brandId: number | string) => `${APIBaseURl}/api/vendors/product-by-vendor/get_car_models_by_brand?brand_id=${brandId}`;
export const GetAllCarBrandsEndpoint = `${APIBaseURl}/api/vendors/product-by-vendor/get_all_car_brands`;
export const VendorProductShowEndpoint = (id: number) => `${APIBaseURl}/api/vendors/product-by-vendor/${id}`;
export const VendorProductUpdateEndpoint = (id: number) => `${APIBaseURl}/api/vendors/product-by-vendor/${id}`;
export const VendorProductDeleteEndpoint = (id: number) => `${APIBaseURl}/api/vendors/product-by-vendor/${id}`;
export const ProductCompatibilityEndpoint = (id: number) => `${APIBaseURl}/api/vendors/product-by-vendor/compatibility/${id}`;
export const AddCompatibilityEndpoint = `${APIBaseURl}/api/vendors/product-by-vendor/add-compatibility`;
export const GetProductsByVendorEndpoint = (vendorId: number) => `${APIBaseURl}/api/vendors/product-by-vendor/by-vendor/${vendorId}`;
export const GetCountriesEndpoint = `${APIBaseURl}/api/vendors/product-by-vendor/get_countries`;
export const GetBrandsEndpoint = `${APIBaseURl}/api/vendors/product-by-vendor/get_brands`;
export const GetYearsEndpoint = `${APIBaseURl}/api/vendors/product-by-vendor/get_years`;
export const GetCategoriesEndpoint = `${APIBaseURl}/api/vendors/product-by-vendor/get_categories`;
export const GetUnitsEndpoint = `${APIBaseURl}/api/vendors/product-by-vendor/get_units`;

export const ProductsByCategoryEndpoint = (categoryId: number) => `${APIBaseURl}/api/vendors/product-by-vendor/ProductByCategory/${categoryId}`;
export const EcomProductByIdEndpoint = (id: number) => `${APIBaseURl}/api/vendors/product-by-vendor/ecom-product/${id}`;
export const SubcategoriesByCategoryEndpoint = (categoryId: number) => `${APIBaseURl}/api/vendors/product-by-vendor/${categoryId}/subcategories`;
