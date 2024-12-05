import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AllCampaign from "../pages/AllCampaign";
import Home from "../pages/Home";
import AddCampaign from "../pages/AddCampaign";
import AuthLayout from "../layout/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import CampaginDetails from "../pages/CampaginDetails";
import MyCampaign from "../pages/MyCampaign";

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
                loader: () => fetch('http://localhost:5000/campaigns')
            },
            {
                path: "/addCampaign",
                element: <AddCampaign/>,
            },
            {
                path: "/myCampaign",
                element:<MyCampaign />,
            },
            {
                path: "/myDonations",
                element: <h1>my donations</h1>
            },
            {
                path:"/campaigns/:id",
                element:<CampaginDetails />,
                loader: ({params}) => fetch(`http://localhost:5000/campaigns/${params.id}`)

            }
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
    },{
        path:'*',
        element:<h1>404</h1>
    }
]);

export default router;