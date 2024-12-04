import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AllCampaign from "../pages/AllCampaign";
import Home from "../pages/Home";
import AddCampaign from "../pages/AddCampaign";
import AuthLayout from "../layout/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element:<Home/>
            },
            {
                path: "/campaigns",
                element: <AllCampaign/>,
            },
            {
                path: "/addCampaign",
                element: <AddCampaign/>
            },
            {
                path: "/myCampaign",
                element: <h1>my campaign</h1>
            },
            {
                path: "/myDonations",
                element: <h1>my donations</h1>
            },
        ]
    },
    {
        path:'auth',
        element:<AuthLayout/>,
        children:[
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<Register/>
            }
        ]
    }
]);

export default router;