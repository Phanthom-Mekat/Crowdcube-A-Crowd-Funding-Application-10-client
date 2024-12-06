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
import UpdateCampaign from "../components/UpdateCampaign";
import MyDonation from "../pages/MyDonation";
import PrivateRouter from "./PrivateRouter";
import ErrorPage from "../pages/ErrorPage";

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
                loader: () => fetch('https://batch-10-assignment-10-server.vercel.app/campaigns')
            },
            {
                path: "/addCampaign",
                element: <PrivateRouter><AddCampaign/></PrivateRouter> ,
            },
            {
                path: "/myCampaign",
                element:<PrivateRouter><MyCampaign/></PrivateRouter>,
            },
            
            {
                path:"/campaigns/:id",
                element:<PrivateRouter><CampaginDetails/></PrivateRouter>,
                loader: ({params}) => fetch(`https://batch-10-assignment-10-server.vercel.app/campaigns/${params.id}`)
            },
            {
                path:'/updateCampaign/:id',
                element:<PrivateRouter><UpdateCampaign/></PrivateRouter>,
                loader: ({params}) => fetch(`https://batch-10-assignment-10-server.vercel.app/campaigns/${params.id}`)

            },{
                path: "/myDonations",
                element: <PrivateRouter><MyDonation/></PrivateRouter>
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
    },{
        path:'*',
        element:<ErrorPage />
    }
]);

export default router;