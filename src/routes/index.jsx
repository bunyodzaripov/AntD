import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
   Routes,
} from "react-router-dom";
import App from "../App";
import {
   SignIn,
   SignUp,
   AdminLayout,
   Category,
   Brand,
   BrandCategory,
   AdsCategory,
   Stock,
   Settings,
   Products,
   SubCategory,
   ProductDetails,
} from "@pages";
const Index = () => {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route path="/" element={<App />}>
            <Route path="/" element={<SignIn />} />
            <Route path="admin-layout" element={<AdminLayout />}>
               <Route index element={<Products />} />
               <Route path="product-details/:id" element={<ProductDetails />} />
               <Route path="category" element={<Category />} />
               <Route path="sub-category/:id" element={<SubCategory />} />
               <Route path="brand" element={<Brand />} />
               <Route path="brand-category" element={<BrandCategory />} />
               <Route path="ads" element={<AdsCategory />} />
               <Route path="stock" element={<Stock />} />
               <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/sign-up" element={<SignUp />} />
         </Route>
      )
   );

   return <RouterProvider router={router} />;
};

export default Index;
