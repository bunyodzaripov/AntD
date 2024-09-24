import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
   Routes,
} from "react-router-dom";
import App from "../App";
import { SignIn, SignUp, AdminLayout, Category, Brand } from "@pages";
const Index = () => {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route path="/" element={<App />}>
            <Route path="/" element={<SignIn />} />
            <Route path="admin-layout" element={<AdminLayout />}>
               <Route index element={<Category />} />
               <Route path="brand" element={<Brand />} />
            </Route>
            <Route path="/sign-up" element={<SignUp />} />
         </Route>
      )
   );

   return <RouterProvider router={router} />;
};

export default Index;
