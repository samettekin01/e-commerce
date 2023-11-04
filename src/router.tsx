import { createBrowserRouter } from "react-router-dom"
import App from "./App";
import ProductDetail from "./components/productDetail/productDetail";
import Products from "./components/products/products";
import Category from "./components/category/category";
import Basket from "./components/basket/basket";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {
                index: true,
                element: <Products />
            },
            {
                path: "/category/:categoryName",
                element: <Category />
            },
            {
                path: "/:categoryName/product/:id",
                element: <ProductDetail />
            },
            {
                path: "/basket",
                element: <Basket />
            }
        ]
    }
]);
