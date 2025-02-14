import { createBrowserRouter } from "react-router-dom"
import App from "./App";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Products from "./components/Products/Products";
import Category from "./components/Category/Category";
import Basket from "./components/Basket/Basket";
import Favorites from "./components/Favorites/Favorites";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
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
            },
            {
                path: "/favorites",
                element: <Favorites />
            }
        ]
    }
]);
