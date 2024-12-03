import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AllCampaign from "../pages/AllCampaign";
import Home from "../pages/Home";

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
                element: <h1>add campaign</h1>
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
]);

export default router;