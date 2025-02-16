import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layout/FrontLayout";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import BackPage from "../pages/BackPage";


const router = createHashRouter([
    {
        path:'/',
        element: <FrontLayout />,
        children:[
            {
                path:'',
                element: < HomePage />,
            },
            {
                path:'products',
                element: < ProductPage />,
            },
            {
                path:'products/:id',
                element: < ProductDetailPage />,
            },
            {
                path:'cart',
                element: < CartPage />,
            }
        ]
    },
    {
        path:'/login',
        element: <LoginPage />
    },
    {
        path:'/admin',
        element: <BackPage />,
    },
    {
        path:'*',
        element: <NotFound />
    }
])


export default router